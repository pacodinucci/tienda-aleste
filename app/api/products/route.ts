import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, type, category, size, src, description, user } = body;

    if (!user) {
      return new NextResponse("User not found", { status: 400 });
    }

    if (!title || !type || !category || !size || !src || !description) {
      return new NextResponse("All fields are required.", { status: 400 });
    }

    const product = await db.product.create({
      data: {
        title,
        type,
        category,
        size,
        src,
        description,
        userId: user.id,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
