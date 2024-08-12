"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";

import useCartStore from "@/hooks/use-cart-store";
import { montserrat } from "@/lib/fonts";
import { useRouter, usePathname } from "next/navigation";

const MobileCart = () => {
  const router = useRouter();
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);

  const hiddenPaths = ["/cart", "/shipping", "/confirmation"];
  if (cart.length === 0 || hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 right-5 md:hidden bg-green-900 text-white p-3 rounded-full shadow-lg flex items-center justify-center z-50"
      onClick={() => router.push("/cart")}
    >
      <ShoppingCart size={24} className="mr-2" />
      <p className={`${montserrat.className} mr-2`}>Ir al carrito</p>
      <span className="text-xl font-semibold">{cart.length}</span>
    </div>
  );
};

export default MobileCart;
