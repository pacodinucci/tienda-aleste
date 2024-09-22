import postShipnowVariant from "@/app/actions/post-shipnow-variant";
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
      harvest,
      fermentation,
      aging,
      notes,
      composition,
      cellar,
      alcohol,
      ph,
      user,
      discount,
      price,
      stock,
      external_reference,
      available,
      boxSize,
      weight,
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
      !harvest ||
      !fermentation ||
      !aging ||
      !notes ||
      !composition ||
      !cellar ||
      !alcohol ||
      !ph ||
      // !discount ||
      !price ||
      !stock ||
      !external_reference ||
      !available ||
      !boxSize ||
      !weight
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
        harvest,
        fermentation,
        aging,
        notes,
        composition,
        cellar,
        alcohol,
        ph,
        discount,
        price,
        stock,
        external_reference,
        available,
        boxSize,
        weight,
        userId: user.id,
      },
    });

    const variantData = {
      external_reference,
      title,
      price: {
        retail: price * boxSize,
      },
      dimensions: {
        weight,
        height: 32,
        length: 26,
        width: 18,
      },
    };

    console.log(variantData);

    const productVariant = await postShipnowVariant(variantData);

    if (!productVariant)
      return new NextResponse("Error cargando variante en Shipnow.", {
        status: 400,
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
