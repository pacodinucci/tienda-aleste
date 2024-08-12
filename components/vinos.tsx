"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { montserrat } from "@/lib/fonts";
import { Button } from "./ui/button";

const VinosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -50px 0px",
  });

  // const refMobile = useRef(null);
  // const isInViewMobile = useInView(refMobile, {
  //   once: true,
  //   margin: "0px 0px -50% 0px",
  // });

  return (
    <div
      className="h-screen md:h-full flex flex-col md:flex-row px-2 md:px-6 pt-10 relative"
      ref={ref}
    >
      {/* Contenido para pantallas grandes */}
      <motion.div
        className={`${montserrat.className} hidden md:flex w-1/2 bg-darkCustom text-white text-lg p-12 flex-col gap-y-6 justify-center items-center`}
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p>
          En los comienzos, el reconocido enólogo italiano, Alberto Antonini fue
          quien estableció los primeros parámetros para la elaboración de los
          vinos de Al Este, escuela que se ha internalizado y que continúa
          aplicándose hasta el presente. Veinte años de experiencia han
          permitido sortear adversidades y perfeccionar los métodos de
          vinificación.
        </p>
        <p>
          Actualmente, los vinos son eleborados con la visión de Daniel Di
          Nucci, fundador de la bodega, y la supervisión del enólogo César
          Cárdenas. La pasión y el trabajo de todo el equipo de Al Este
          potenciados por las cualidades y características del terroir se ven
          reflejados en nuestros vinos.
        </p>
        <p>
          Para conocer en detalle nuestros vinos, podés visitar nuestra tienda
          online.
        </p>
        <Button
          className={`${montserrat.className} rounded-none hover:bg-midBrownCustom/80 self-start bg-midBrownCustom uppercase tracking-wide text-bas`}
        >
          Ir a la tienda online
        </Button>
      </motion.div>
      <motion.div
        className="hidden md:block w-1/2 relative"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/copa.png"
          alt="vino al este"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
        />
      </motion.div>

      {/* Contenido para pantallas móviles */}
      <div className="md:hidden relative w-full h-full">
        <Image
          src="/copa.png"
          alt="vino al este"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          className="absolute inset-0 z-0"
        />
        <div
          className={`${montserrat.className} absolute inset-0 bg-darkCustom bg-opacity-60 text-white text-lg p-12 flex flex-col gap-y-6 justify-center items-center`}
        >
          <p>
            Los vinos son eleborados con la visión de Daniel Di Nucci, fundador
            de la bodega, y la supervisión del enólogo César Cárdenas.
          </p>
          <p>
            Para conocer en detalle nuestros vinos, podés visitar nuestra tienda
            online.
          </p>
          <Button
            className={`${montserrat.className} rounded-none hover:bg-midBrownCustom/80 self-start bg-midBrownCustom uppercase tracking-wide text-bas`}
          >
            Ir a la tienda online
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VinosSection;
