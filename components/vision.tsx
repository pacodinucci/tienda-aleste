import Image from "next/image";
import React from "react";
import { motion, useInView } from "framer-motion";
import { montserrat } from "@/lib/fonts";

const VisionSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50% 0px" });

  return (
    <div
      ref={ref}
      className="h-screen mx-6 flex flex-col md:flex-row relative overflow-x-hidden"
    >
      <motion.div
        className="absolute inset-0 h-full w-full md:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/bodegaarbol.png"
          alt="al este vinos"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
      <div
        className={`relative bg-darkCustom md:bg-opacity-100 bg-opacity-60 text-white text-lg px-6 py-8 md:px-10 md:py-12 w-full h-full md:w-1/2 z-10 tracking-wide leading-8 flex flex-col justify-center items-center gap-y-4 ${montserrat.className}`}
      >
        <motion.div
          initial={{ x: -100, opacity: 1 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p>
            Con espíritu pionero llegamos a un lugar único, distinto y poco
            conquistado. Allí, donde se confunden la Pampa y la Patagonia, Al
            Este Bodega & Viñedos representa el punto de partida para sumar al
            mapa vitivinícola mundial una nueva región argentina productora de
            vinos de alta calidad.
          </p>
          <p>
            Durante muchos años rigieron disposiciones proteccionistas que
            prohibían producir uva y vino en la Provincia de Buenos Aires. ​​
          </p>
          <p>
            El 1 de diciembre del año 2000 iniciamos nuestra explotación y fue
            ese día cuando la Provincia de Buenos Aires rompió con 63 años de
            prohibición.
          </p>
        </motion.div>
      </div>
      <motion.div
        className="relative hidden md:block w-1/2 h-full"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/bodegaarbol.png"
          alt="al este vinos"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
    </div>
  );
};

export default VisionSection;
