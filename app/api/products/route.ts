import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      type,
      category,
      year,
      size,
      src,
      description,
      user,
      discount,
      price,
      stock,
      available,
      boxSize,
    } = body;

    if (!user) {
      return new NextResponse("User not found", { status: 400 });
    }

    if (
      !title ||
      !type ||
      !category ||
      !year ||
      !size ||
      !src ||
      !description ||
      // !discount ||
      !price ||
      !stock ||
      !available ||
      !boxSize
    ) {
      return new NextResponse("All fields are required.", { status: 400 });
    }

    const product = await db.product.create({
      data: {
        title,
        type,
        category,
        year,
        size,
        src,
        description,
        discount,
        price,
        stock,
        available,
        boxSize,
        userId: user.id,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await db.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
