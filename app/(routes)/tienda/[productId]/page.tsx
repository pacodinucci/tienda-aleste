import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { montserrat } from "@/lib/fonts";
import { formatNumber } from "@/lib/helpers";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import AddToCartButton from "./components/add-to-cart-button";

const ProductIdPage = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  if (!product) {
    return <p>Product not found</p>;
  }

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
        <div className="max-w-5xl flex-1 pr-24 space-y-8">
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
          <Separator />
          <div className={`${montserrat.className} tracking-wide leading-6`}>
            <p>
              La caja incluye {product?.boxSize} botellas de {product?.title} de{" "}
              {product?.size} cada una.
            </p>
            <p>
              Vino consechado y elaborado en nuestra finca propia de Médanos,
              Partido de Villarino, Provincia de Buenos Aires. Esta región de
              suelo de origen calcáreo conforma una región excepcional para la
              producción de vinos de alta calidad.
            </p>
          </div>
          <Separator />
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductIdPage;
