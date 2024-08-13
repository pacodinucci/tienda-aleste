"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { montserrat, oswald } from "@/lib/fonts";
import React, { useEffect, useState } from "react";

const BodegaSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80% 0px" });

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
    <div
      ref={ref}
      className="relative h-screen md:h-full pt-10 md:pt-24 px-2 md:px-6 flex flex-col md:flex-row overflow-x-hidden"
    >
      <motion.h1
        className={`${oswald.className} hidden md:block absolute top-36 left-10 text-white uppercase text-5xl z-20 bg-cuero px-4 py-4`}
        initial={{ y: -100, opacity: 1 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        Bodega
      </motion.h1>
      <motion.div
        className={`hidden md:flex bg-darkCustom/80 absolute bottom-10 right-10 text-white text-lg px-10 py-12 w-[70%] z-10 tracking-wide leading-8 flex-col gap-y-4 ${montserrat.className}`}
        initial={{ y: -100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p>
          Nuestra bodega cuenta con la tecnología para cumplir el ciclo completo
          de producción de vinos de alta gama. Posee tanques de acero inoxidable
          para fermentación y crianza, sala de barricas de roble y estiba de
          botellas.
        </p>
        <p>
          Se complementa con prensa neumática, despalilladora, moledora y
          fraccionadora.
        </p>
      </motion.div>
      <motion.div
        className="hidden md:block w-1/4 relative h-full"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/fondotanques.png"
          alt="bodega al este"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
      <motion.div
        className="hidden md:block w-1/4 relative h-full"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/barricas.png"
          alt="bodega al este"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
      <motion.div
        className="hidden md:block w-1/2 relative h-full"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/invierno.png"
          alt="bodega al este"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
      <motion.div
        className="relative md:hidden h-full w-full"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/fondotanques.png"
          layout="fill"
          objectFit="cover"
          alt="tanques bodega al este"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-darkCustom bg-opacity-50" />
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center gap-y-4 text-left text-lg leading-9 text-white p-6"
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`${oswald.className} uppercase text-4xl mb-6`}>
            Bodega
          </h1>
          <p className={`${montserrat.className}`}>
            Nuestra bodega cuenta con la tecnología para cumplir el ciclo
            completo de producción de vinos de alta gama. Posee tanques de acero
            inoxidable para fermentación y crianza, sala de barricas de roble y
            estiba de botellas.
          </p>
          <p
            className={`${montserrat.className} ${
              isShortScreen ? "hidden" : ""
            }`}
          >
            Se complementa con prensa neumática, despalilladora, moledora y
            fraccionadora.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BodegaSection;
