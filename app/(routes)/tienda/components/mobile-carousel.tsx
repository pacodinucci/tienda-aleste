"use client";

import React from "react";
import Image from "next/image";

import { montserrat } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import useCartStore from "@/hooks/use-cart-store";
import { TiendaCarouselProps } from "./carousel";

const MobileCarousel: React.FC<TiendaCarouselProps> = ({ products }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  console.log(cart);

  const handleAddToCart = (product: Product) => {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      boxSize: product.boxSize,
      discount: product.discount,
      weight: product.weight,
      src: product.src,
    };

    addToCart(cartProduct);
  };

  return (
    <div className="flex md:hidden flex-col gap-y-16">
      {products.map((item, index) => (
        <div
          key={item.src}
          className="flex-shrink-0 p-2 flex justify-center items-center flex-col gap-y-4"
        >
          <div className="relative w-full h-96 overflow-hidden flex flex-col text-center justify-center items-center gap-y-4">
            <Image
              src={item.src}
              alt={item.src}
              layout="fill"
              objectFit="cover"
              className="cursor-pointer hover:scale-125 transition-all duration-500"
            />
            {item.discount !== "0" && (
              <span className="w-16 h-16 ml-16 flex items-center justify-center p-3 rounded-full text-white font-medium absolute top-5 left-5 bg-gradient-to-r from-amber-600 to-orange-800">
                {item.discount}% OFF
              </span>
            )}
          </div>
          <div className="text-center cursor-pointer">
            <p
              className={`${montserrat.className} w-56 min-h-12 hover:text-midBrownCustom`}
            >
              {item.title} &mdash; {`Caja (${item.boxSize}u)`}
            </p>
            <p className="text-lg font-semibold">
              {item.discount !== "0" ? (
                <>
                  <span className="text-neutral-500 font-light line-through mr-2">
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      //   minimumFractionDigits: 0,
                      //   maximumFractionDigits: 0,
                    }).format(Number(item.price) * Number(item.boxSize))}
                  </span>
                  <span>
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      //   minimumFractionDigits: 0,
                      //   maximumFractionDigits: 0,
                    }).format(
                      Number(item.price) *
                        Number(item.boxSize) *
                        (1 - Number(item.discount) / 100)
                    )}
                  </span>
                </>
              ) : (
                new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  //   minimumFractionDigits: 0,
                  //   maximumFractionDigits: 0,
                }).format(Number(item.price) * Number(item.boxSize))
              )}
            </p>
          </div>
          <Button
            className={`${montserrat.className} rounded-none bg-midBrownCustom hover:bg-midBrownCustom/80 uppercase tracking-wide`}
            onClick={() => handleAddToCart(item)}
          >
            Agregar al carrito
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MobileCarousel;
