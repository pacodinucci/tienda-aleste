"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus } from "lucide-react";

import useCartStore from "@/hooks/use-cart-store";
import { montserrat } from "@/lib/fonts";
import Image from "next/image";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();

  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateCartItem,
    clearCart,
  } = useCartStore();

  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      return (
        total +
        Number(product.price) * Number(product.boxSize) * product.quantity
      );
    }, 0);
  };

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed top-0 right-0 w-1/3 h-full bg-midBrownCustom shadow-xl p-4 z-50"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
        >
          <button
            onClick={toggleCart}
            className="absolute top-6 right-6 text-xl text-white"
          >
            <X />
          </button>
          <div className="flex items-center gap-x-4">
            <Image
              src="/logogaviotas.svg"
              alt="logo al este"
              width={60}
              height={0}
            />
            <h2
              className={`${montserrat.className} text-2xl text-white mb-4 uppercase tracking-wide pt-4`}
            >
              Carrito de compras
            </h2>
          </div>
          <Separator className="bg-white my-2 py-[.8px]" />
          {cart.length === 0 ? (
            <p
              className={`${montserrat.className} text-white text-lg tracking-wide mt-6`}
            >
              El carrito está vacío.
            </p>
          ) : (
            <div className="mt-6">
              <div className="flex flex-col gap-y-4">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className={`${montserrat.className} flex justify-between items-center mb-4`}
                  >
                    <div className="flex gap-x-2 w-full">
                      <div>
                        <Image
                          src={product.src}
                          alt="botella al este"
                          width={70}
                          height={0}
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2 w-full">
                        <div className="flex w-full justify-between">
                          <h3 className="text-white">{product.title}</h3>
                          <p className="text-white">
                            {formatNumber(
                              Number(product.price) *
                                Number(product.boxSize) *
                                product.quantity
                            )}
                          </p>
                        </div>
                        <div className="flex">
                          <div className="flex items-center gap-x-4">
                            <div className="flex items-center py-1 px-2 border-2 border-white text-white">
                              <button
                                onClick={() =>
                                  updateCartItem(
                                    product.id,
                                    product.quantity - 1
                                  )
                                }
                              >
                                <Minus size={15} />
                              </button>
                              <input
                                min="0"
                                value={product.quantity}
                                onChange={(e) =>
                                  updateCartItem(
                                    product.id,
                                    Number(e.target.value)
                                  )
                                }
                                className="text-white dark:text-white border-0 bg-transparent text-xs font-normal focus:outline-none focus:ring-0 max-w-[2rem] text-center"
                                style={{ MozAppearance: "textfield" }}
                              />
                              <button
                                onClick={() =>
                                  updateCartItem(
                                    product.id,
                                    product.quantity + 1
                                  )
                                }
                              >
                                <Plus size="15" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="text-white border-2 border-white py-1 px-4 flex items-center text-xs gap-x-2"
                            >
                              <Trash2 size={15} />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="bg-white my-2 py-[.8px]" />
              <div
                className={`${montserrat.className} flex justify-between items-center text-white mt-4`}
              >
                <p className="text-lg">Subtotal</p>
                <p className="text-lg">{formatNumber(calculateTotal())}</p>
              </div>
              <div
                className={`${montserrat.className} absolute bottom-5 right-4 flex items-center gap-x-2`}
              >
                <button
                  onClick={clearCart}
                  className="text-white py-1 px-4 flex items-center text-sm gap-x-2"
                >
                  <Trash2 size={20} />
                  Eliminar carrito
                </button>
                <button
                  onClick={() => {
                    router.push("/shipping");
                    toggleCart();
                  }}
                  className="py-2 px-4 border-2 border-white hover:bg-brownCustom/10 text-white uppercase"
                >
                  Continuar con la compra
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
