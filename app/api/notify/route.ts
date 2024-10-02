import mercadopago from "mercadopago";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import postShipnowOrder from "@/app/actions/post-shipnow-order";
import nodemailer from "nodemailer";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

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

        // Datos de envío desde shippingDetails (ignoramos los tipos)
        const shippingDetails = order.shippingDetails as any; // Evitamos problemas de tipos

        // Extraemos el `cart` de la orden
        const cart = order.cart as any[]; // Cart es un JSON, asumimos que contiene los datos correctamente

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

        // Enviamos la orden a Shipnow
        const shipnowResponse = await postShipnowOrder(orderData);
        console.log("Respuesta de Shipnow:", shipnowResponse);

        if (!shipnowResponse) {
          console.error("Error al crear la orden en Shipnow");
          return new NextResponse("Error al crear la orden en Shipnow.", {
            status: 400,
          });
        }

        //TODO: enviar mails con mailchimp
        try {
          const mailOptions = {
            from: "Bodega Al Este",
            to: order.email,
            subject: "Confirmación de compra",
            text: "Hola, este es un mail de prueba para la Confirmación de compra de Bodega Al Este.",
          };

          const info = await transporter.sendMail(mailOptions);
          console.log(
            "Correo de Confirmación enviado correctamente",
            info.messageId
          );
        } catch (error) {
          console.error("Error sending email", error);
        }

        // Actualizamos el stock de los productos
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
