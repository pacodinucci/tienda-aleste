import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { montserrat, oswald } from "@/lib/fonts";
import React from "react";

const BodegaSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50% 0px" });

  return (
    <div ref={ref} className="flex h-full pt-24 px-6 relative">
      <motion.h1
        className={`${oswald.className} absolute top-36 left-10 text-white uppercase text-5xl z-20 bg-cuero px-4 py-4`}
        initial={{ x: -100, opacity: 1 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        Bodega
      </motion.h1>
      <motion.div
        className={`bg-darkCustom/80 absolute bottom-10 right-10 text-white text-lg px-10 py-12 w-[70%] z-10 tracking-wide leading-8 flex flex-col gap-y-4 ${montserrat.className}`}
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
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
        className="w-1/4 relative h-full"
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
        className="w-1/4 relative h-full"
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
        className="w-1/2 relative h-full"
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
    </div>
  );
};

export default BodegaSection;
