"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import useCartStore from "@/hooks/use-cart-store";
import { montserrat, oswald } from "@/lib/fonts";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./ui/input";

const CartTotals = () => {
  const { cart } = useCartStore();
  const [showShippingForm, setShowShippingForm] = useState(false);

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, product) => {
      const price = Number(product.price);
      const boxSize = Number(product.boxSize);
      const quantity = product.quantity;
      const discount = Number(product.discount || 0);

      // Apply discount if it exists
      const discountedPrice =
        discount > 0 ? price * (1 - discount / 100) : price;

      return total + discountedPrice * boxSize * quantity;
    }, 0);
  };

  return (
    <div className="border-2 border-slate-300 h-auto w-96 p-6 flex flex-col justify-between gap-y-2">
      <h3 className={`${oswald.className} text-xl text-neutral-800`}>
        Totales del carrito
      </h3>
      <div className={`${montserrat.className} flex-1 flex flex-col`}>
        <div className="border-b border-dashed border-slate-200 py-4 flex justify-between">
          <p>Subtotal</p>
          <p className="font-medium">{formatNumber(calculateSubtotal())}</p>
        </div>
        <div className="border-b border-dashed border-slate-200 py-4 flex-col justify-between">
          <div className="flex justify-between">
            <p>Envío</p>
            <p
              className="text-neutral-800 hover:text-slate-600 cursor-pointer"
              onClick={() => setShowShippingForm(!showShippingForm)}
            >
              Calcular envío
            </p>
          </div>
          <AnimatePresence>
            {showShippingForm && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -30 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.1 }}
                className="overflow-hidden py-4"
              >
                <div className="flex items-center gap-2 justify-end">
                  <Input
                    type="text"
                    placeholder="Ingrese C.P."
                    className="border border-slate-300 px-4 py-2 w-40 rounded-none"
                  />
                  <Button
                    className={`${montserrat.className} bg-darkCustom hover:bg-darkCustom/90 rounded-none`}
                  >
                    Calcular
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="py-4">
          <p>Total</p>
          <p></p>
        </div>
      </div>
      <Button
        className={`${montserrat.className} bg-darkCustom hover:bg-darkCustom/90 rounded-none`}
      >
        Finalizar compra
      </Button>
    </div>
  );
};

export default CartTotals;
