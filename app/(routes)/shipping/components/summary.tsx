"use client";

import React from "react";
import Image from "next/image";
import { montserrat, oswald } from "@/lib/fonts";
import useCartStore from "@/hooks/use-cart-store";
import { Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/hooks/use-cart-store";
import { useShippingStore } from "@/hooks/use-shipping-store";
import { useFormContext } from "@/context/shipping-form-context";
import AccordionRadioGroup from "@/components/ui/accordion-radio-group";

const Summary = () => {
  const { cart, removeFromCart, updateCartItem } = useCartStore();
  const { shippingInfo } = useShippingStore();
  const { handleSubmit } = useFormContext();

  const calculateSubtotal = (item: CartProduct) => {
    return Number(item.price) * Number(item.boxSize) * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      return (
        total +
        Number(product.price) * Number(product.boxSize) * product.quantity
      );
    }, 0);
  };

  const calculateTotalWithShipping = () => {
    const shippingCost = 0; // Para este ejemplo es 0
    return calculateTotal() + shippingCost;
  };

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  const onSubmit = (data: any) => {
    console.log("Carrito:", cart);
    console.log("Información de envío:", data);
  };

  const paymentOptions = [
    {
      label: "Compras con tarjetas guardadas o saldo en Mercado Pago",
      value: "mercado-pago-saldo",
      description:
        "Descripción para pagos con tarjetas guardadas o saldo en Mercado Pago.",
    },
    {
      label: "Hasta 12 pagos sin tarjeta con Mercado Pago",
      value: "mercado-pago-cuotas",
      description: "Descripción para pagos sin tarjeta con Mercado Pago.",
    },
    {
      label: "Transferencia bancaria directa",
      value: "transferencia",
      description:
        "PAGO POR TRANSFERENCIA: 10% OFF (se aplica automáticamente al seleccionar esta opción)\n\nRealiza tu pago directamente en nuestra cuenta bancaria. Por favor, usa el número del pedido como referencia de pago. Tu pedido no se procesará hasta que se haya recibido el importe en nuestra cuenta.",
      discount: "(10% de descuento)",
    },
  ];

  return (
    <div className="h-full p-4 space-y-2 max-w-4xl pl-6 pr-24 relative">
      <h2
        className={`${oswald.className} text-neutral-700 text-3xl tracking-wide px-6 py-4 mb-4 uppercase`}
      >
        Resumen de compra
      </h2>
      {cart.map((item) => (
        <div
          key={item.id}
          className={`${montserrat.className} flex items-center justify-between p-4 border-b border-gray-300`}
        >
          <div className="flex items-center space-x-2">
            <Image
              src={item.src}
              alt={item.title}
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-sm">{item.quantity}</span>
            <span className="text-sm">x</span>
            <span className="text-base">{item.title}</span>
          </div>
          <span className="text-lg">
            {calculateSubtotal(item).toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </span>
        </div>
      ))}
      <div className="max-w-80 ml-auto">
        <div
          className={`${montserrat.className} flex justify-between gap-x-6 text-xl px-4`}
        >
          <p>Subtotal</p>
          <span>{formatNumber(calculateTotal())}</span>
        </div>
        <div
          className={`${montserrat.className} flex justify-between gap-x-6 text-xl px-4 mt-2`}
        >
          <p>Envío</p>
          <span>{formatNumber(0)}</span>
        </div>
        <p className="text-xs text-right px-4 text-neutral-500 mb-2">
          (Los envíos en CABA y GBA no tienen costo.)
        </p>
        <Separator />
        <div
          className={`${montserrat.className} flex justify-between gap-x-6 text-xl px-4 mt-2`}
        >
          <p className="font-medium">Total a pagar</p>
          <span>{formatNumber(calculateTotalWithShipping())}</span>
        </div>
      </div>
      <div className="pt-10 pl-6">
        <AccordionRadioGroup options={paymentOptions} />
      </div>
      <div className="flex justify-end pt-8">
        <Button
          className={`${montserrat.className} bg-midBrownCustom text-white uppercase hover:bg-midBrownCustom/70 rounded-none`}
          onClick={handleSubmit(onSubmit)}
        >
          Ir a pagar
        </Button>
      </div>
    </div>
  );
};

export default Summary;
