import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { packingbillNumber, products } = body;

    if (!packingbillNumber || !products || !products.length)
      return new NextResponse("All fileds are required.", { status: 400 });

    // TODO: Products id validation

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
