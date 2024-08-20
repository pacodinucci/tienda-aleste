import db from "@/lib/db";
import React from "react";

const ProductIdPage = async ({ params }: { params: { productId: string } }) => {
  console.log(params);

  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  return <div className="pt-52">{product?.title}</div>;
};

export default ProductIdPage;
