import db from "@/lib/db";
import { montserrat } from "@/lib/fonts";
import { formatNumber } from "@/lib/helpers";
import Image from "next/image";
import React from "react";

const ProductIdPage = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  const imageUrl = product?.src || "/bottleplaceholder.png";

  return (
    <div className="pt-40 pb-24">
      <div className="flex justify-center">
        <div className="">
          <Image
            src={imageUrl}
            alt="imagen vino al este"
            width={700}
            height={0}
          />
        </div>
        <div className="min-w-[55vw]">
          <h1
            className={`${montserrat.className} text-neutral-700 text-4xl font-medium leading-15`}
          >
            {product?.title}
          </h1>
          {product?.discount !== "0" ? (
            <div className="flex gap-x-2">
              <p className="line-through text-neutral-400 text-2xl">
                {formatNumber(
                  Number(product?.price) * Number(product?.boxSize)
                )}
              </p>
              <p className="text-neutral-700 text-2xl">
                {formatNumber(
                  Number(product?.price) *
                    Number(product?.boxSize) *
                    (1 - Number(product?.discount) / 100)
                )}
              </p>
            </div>
          ) : (
            <p>
              {formatNumber(Number(product?.price) * Number(product?.boxSize))}
            </p>
          )}
          <p>{product?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductIdPage;
