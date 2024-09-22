import mercadopago from "mercadopago";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  const body = await req.text();
  const parsedBody = JSON.parse(body);

  try {
    if (parsedBody.type) {
      const payment = await mercadopago.payment.findById(parsedBody.data.id);

      if (payment.body.status_detail === "accredited") {
        const order = await db.order.update({
          where: {
            id: payment.body.metadata.order_id,
          },
          data: {
            isPaid: true,
          },
          include: {
            orderItems: true,
          },
        });

        // TODO: crear order de shipnow

        console.log("METADATA -->>> ", payment.body.metadata);
        payment.body.metadata.products.map(async (product: any) => {
          await db.product.update({
            where: {
              id: product.id,
            },
            data: {
              stock: {
                decrement: product.quantity,
              },
            },
          });

          const updatedProduct = await db.product.findUnique({
            where: {
              id: product.id,
            },
          });

          if (updatedProduct?.stock === 0) {
            await db.product.update({
              where: {
                id: product.id,
              },
              data: {
                available: false,
              },
            });
          }
        });
      }
    }

    return new NextResponse(parsedBody.data.id, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
