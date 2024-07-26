import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import db from "@/lib/db";
import ProductForm from "./components/product-form";

interface ProductIdPagePros {
  params: {
    productId: string;
  };
}

const ProductIdPage = async ({ params }: ProductIdPagePros) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  return (
    <div>
      <ProductForm initialData={product} user={user} />
    </div>
  );
};

export default ProductIdPage;
