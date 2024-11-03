import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { packingbillNumber, products } = body;

    if (!packingbillNumber || !products || !products.length)
      return new NextResponse("All fields are required.", { status: 400 });

    for (const product of products) {
      const { productId, stock } = product;

      if (!productId || stock === undefined) {
        return new NextResponse("Each product must have an id and stock.", {
          status: 400,
        });
      }

      const existingProduct = await db.product.findUnique({
        where: { id: productId },
      });

      if (!existingProduct) {
        return new NextResponse(`Product with id ${productId} not found.`, {
          status: 404,
        });
      }

      await db.product.update({
        where: { id: productId },
        data: {
          stock: existingProduct.stock + stock,
        },
      });
    }

    const packingbill = await db.packingbill.create({
      data: {
        packingbillNumber,
        products,
      },
    });

    return NextResponse.json(packingbill);
  } catch (error) {
    console.error("PACKINGBILL_POST_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
