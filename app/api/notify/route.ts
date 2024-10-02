import mercadopago from "mercadopago";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import postShipnowOrder from "@/app/actions/post-shipnow-order";
import nodemailer from "nodemailer";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

// Configuramos el transporter de nodemailer para Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Tu dirección de correo de Gmail
    pass: process.env.EMAIL_PASS, // App Password generado desde tu cuenta de Google
  },
});

export async function POST(req: Request) {
  const body = await req.text();
  const parsedBody = JSON.parse(body);

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

  try {
    console.log("Payload recibido de MercadoPago:", parsedBody);

    if (parsedBody.type) {
      // Encontrar pago en MercadoPago
      const payment = await mercadopago.payment.findById(parsedBody.data.id);
      console.log("Pago encontrado en MercadoPago:", payment);

      if (payment.body.status_detail === "accredited") {
        console.log("Pago acreditado, actualizando la orden...");

        // Recuperamos la orden en base al metadata de MercadoPago
        const order = await db.order.update({
          where: {
            id: payment.body.metadata.order_id, // ID de la orden almacenada en los metadatos
          },
          data: {
            isPaid: true, // Marcamos la orden como pagada
          },
          include: {
            orderItems: true, // Incluimos los items de la orden
          },
        });

        console.log("Orden actualizada:", order);

        // Datos de envío desde shippingDetails
        const shippingDetails = order.shippingDetails as any;

        // Extraemos el `cart` de la orden
        const cart = order.cart as any[];

        // Creamos los datos de la orden para Shipnow basados en el cart
        const orderData = {
          external_reference: order.id, // Referencia de la orden en nuestro sistema
          ship_to: {
            name: order.name,
            last_name: "", // Opcional
            zip_code: shippingDetails?.zipCode || "",
            address_line: shippingDetails?.address || "",
            city: shippingDetails?.city || "",
            state: shippingDetails?.region || "",
            email: order.email,
          },
          items: cart.map((item: any) => ({
            id: item.shipnowVariantId, // Usamos el `shipnowVariantId` almacenado en el cart
            quantity: item.quantity, // La cantidad de cada producto
          })),
        };

        console.log("Datos de la orden para Shipnow:", orderData);

        // Enviar la orden a Shipnow
        const shipnowResponse = await postShipnowOrder(orderData);
        console.log("Respuesta de Shipnow:", shipnowResponse);

        if (!shipnowResponse) {
          console.error("Error al crear la orden en Shipnow");
          return new NextResponse("Error al crear la orden en Shipnow.", {
            status: 400,
          });
        }

        // Enviar correo de confirmación
        try {
          // Crear una plantilla de email (en vez de texto plano)
          const mailOptions = {
            from: `"Bodega Al Este" <${process.env.EMAIL_USER}>`, // Dirección de envío
            to: order.email, // Enviamos al email del cliente
            bcc: "franciscoldinucci@gmail.com", // También enviamos en BCC
            subject: "Confirmación de compra - Bodega Al Este",
            html: `
              <h2>Gracias por tu compra, ${order.name}</h2>
              <p>Tu pedido ha sido confirmado y lo estamos preparando para su envío.</p>
              <h3>Detalles del pedido:</h3>
              <ul>
                ${
                  Array.isArray(order.cart) && order.cart.length > 0
                    ? order.cart
                        .map(
                          (item: any) => `
                            <li>
                              Producto: ${item.title} <br/>
                              Cantidad: ${item.quantity} <br/>
                            </li>
                          `
                        )
                        .join("")
                    : "<li>No se encontraron productos en esta orden.</li>"
                }
              </ul>
              <p><strong>Total Pagado:</strong> $${payment.body.transaction_details.total_paid_amount.toFixed(
                2
              )}</p>
              <p>Nos pondremos en contacto contigo cuando el pedido esté listo para ser enviado.</p>
            `,
          };

          const info = await transporter.sendMail(mailOptions);
          console.log(
            "Correo de Confirmación enviado correctamente",
            info.messageId
          );
        } catch (error) {
          console.error("Error al enviar el correo", error);
        }

        // Actualizar el stock de los productos
        await Promise.all(
          payment.body.metadata.products.map(async (product: any) => {
            await db.product.update({
              where: {
                id: product.id, // Usamos el ID del producto
              },
              data: {
                stock: {
                  decrement: product.quantity, // Reducimos el stock
                },
              },
            });

            // Verificamos si el producto se quedó sin stock
            const updatedProduct = await db.product.findUnique({
              where: {
                id: product.id,
              },
            });

            // Si no hay stock disponible, marcamos el producto como no disponible
            if (updatedProduct?.stock === 0) {
              await db.product.update({
                where: {
                  id: product.id,
                },
                data: {
                  available: false, // Marcamos el producto como no disponible
                },
              });
            }
          })
        );

        console.log("Stock actualizado correctamente");
      }
    }

    return new NextResponse(parsedBody.data.id, { status: 200 });
  } catch (error: any) {
    console.error("Error en el webhook de MercadoPago:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
