import mercadopago from "mercadopago";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import postShipnowOrder from "@/app/actions/post-shipnow-order"; // Importamos la función para Shipnow

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  const body = await req.text();
  const parsedBody = JSON.parse(body);

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

        // Creamos los datos de la orden para Shipnow
        const orderData = {
          external_reference: order.id,
          ship_to: {
            name: order.name,
            last_name: "",
            zip_code: shippingDetails?.zipCode || "",
            address_line: shippingDetails?.address || "",
            city: shippingDetails?.city || "",
            state: shippingDetails?.region || "",
            email: order.email,
          },
          items: order.orderItems.map((item: any) => ({
            id: item.product.shipnowVariantId, // ID de la variante en Shipnow
            quantity: item.quantity, // Cantidad del producto
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
