"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { montserrat, oswald } from "@/lib/fonts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const ConfirmationPage = (props: Props) => {
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        {/* Sección izquierda: Imagen */}
        <div className="w-1/2 h-full fixed top-0 left-0">
          <Image
            src="/cava.png"
            alt="cava bodega al este"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>

        {/* Sección derecha: Información de contacto */}
        <div className="bg-brownCustom w-1/2 min-h-screen ml-auto overflow-y-auto p-8 pt-24">
          <div className="pl-8">
            <h1
              className={`${oswald.className} uppercase text-4xl text-darkCustom mb-4`}
            >
              Confirmación de compra
            </h1>
            <Separator className="bg-darkCustom h-[3px]" />
            <div className="py-6">
              <h3
                className={`${montserrat.className} text-4xl text-neutral-800 font-semibold`}
              >
                Gracias por comprar en Bodega Al Este!
              </h3>
              <p
                className={`${montserrat.className} text-xl text-neutral-800 py-4`}
              >
                Tu compra ha sido confirmada. Recibirás un mail con todos los
                detalles de los productos y el envío
              </p>
              <p
                className={`${montserrat.className} text-xl text-neutral-800 py-4`}
              >
                Ante cualquier consulta podés escribirnos a
                info@bodegaaleste.com
              </p>
              <Button
                className={`${montserrat.className} text-base rounded-none hover:bg-midBrownCustom/80 self-start bg-midBrownCustom uppercase tracking-wide mt-6`}
                onClick={() => router.push("/")}
              >
                Ir a la página principal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
