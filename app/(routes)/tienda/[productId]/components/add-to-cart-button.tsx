"use client";

import React, { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

import useCartStore from "@/hooks/use-cart-store";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { montserrat } from "@/lib/fonts";

interface AddToCartButtonProps {
  product?: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, updateCartItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (!product?.id) {
      console.error("El producto o el ID del producto no es válido.");
      return;
    }

    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      boxSize: product.boxSize,
      discount: product.discount || 0,
      weight: product.weight,
      src: product.src,
    };

    addToCart(cartProduct);
  };

  return (
    <div className="flex h-12 gap-x-2">
      <div className="flex items-center h-full">
        <div
          className={`flex items-center justify-center ml-4 md:ml-0 py-2 px-3 md:py-1 md:px-2 border-2 border-darkCustom text-slate-400 h-full w-24`}
        >
          <button onClick={handleDecrease}>
            <Minus size={15} className="md:size-[20px]" />{" "}
          </button>
          <input
            min="0"
            value={quantity}
            onChange={() => {}}
            className="text-slate-500 dark:text-white border-0 bg-transparent text-sm md:text-base font-normal focus:outline-none focus:ring-0 max-w-[2rem] text-center"
            style={{ MozAppearance: "textfield" }}
          />
          <button onClick={handleIncrease}>
            <Plus size={15} className="md:size-[20px]" />{" "}
          </button>
        </div>
      </div>
      <Button
        className={`${montserrat.className} text-lg h-full rounded-none flex-1  bg-darkCustom hover:bg-darkCustom/90`}
        onClick={() => product && handleAddToCart(product)}
      >
        Agregar al carrito
      </Button>
    </div>
  );
};

export default AddToCartButton;
