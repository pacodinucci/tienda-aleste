"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { montserrat } from "@/lib/fonts";

const VisitasSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsShortScreen(window.innerHeight < 600);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mx-2 md:mx-6">
      <div className="relative w-full h-screen mt-16">
        <Image
          src="/bodeganoche.webp"
          alt="bodega al este"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div
          className={`hidden md:flex absolute top-44 right-40 w-[40%] p-10 flex-col gap-y-6`}
        >
          <p
            className={`${montserrat.className} text-white text-lg tracking-wide leading-8`}
          >
            La bodega esta abierta para visitas y degustaciones. También podés
            reservar las instalaciones para fiestas familiares, eventos
            empresariales o reuniones de amigos. Contactános para mayor
            información.
          </p>
          <Button
            className={`${montserrat.className} text-base rounded-none hover:bg-midBrownCustom/80 self-start bg-midBrownCustom uppercase tracking-wide`}
          >
            Contacto
          </Button>
        </div>
        <div
          className={`md:hidden flex w-[80%] flex-col gap-y-6 absolute ${
            isShortScreen ? "top-20" : "top-52"
          } left-10 space-y-6`}
        >
          <p
            className={`${montserrat.className} text-white text-lg tracking-wide leading-8`}
          >
            La bodega esta abierta para visitas y degustaciones. También podés
            reservar las instalaciones para fiestas familiares, eventos
            empresariales o reuniones de amigos. Contactános para mayor
            información.
          </p>
          <Button
            className={`${montserrat.className} text-base rounded-none hover:bg-midBrownCustom/80 self-start bg-midBrownCustom uppercase tracking-wide`}
          >
            Contacto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisitasSection;
