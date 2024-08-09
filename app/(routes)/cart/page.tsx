import React from "react";

import Navbar from "@/components/navbar";
import Steps from "@/components/steps";
import { oswald } from "@/lib/fonts";
import CartItems from "@/components/cart-items";
import CartTotals from "@/components/cart-totals";

const CartPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Steps />
      <div className="px-10">
        <h1
          className={`${oswald.className} uppercase text-4xl text-neutral-800`}
        >
          Carrito
        </h1>
        <div className="flex gap-x-12">
          <CartItems />
          <CartTotals />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
