import Image from "next/image";
import React from "react";
import { motion, useInView } from "framer-motion";
import { montserrat, lato } from "@/lib/fonts";

const VisionSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50% 0px" });

  return (
    <div ref={ref} className="h-full mx-6 flex">
      <motion.div
        className={`bg-darkCustom text-white text-lg px-10 py-12 w-1/2 z-10 tracking-wide leading-8 flex flex-col justify-center items-center gap-y-4 ${montserrat.className}`}
        initial={{ x: -100, opacity: 1 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p>
          Con espíritu pionero llegamos a un lugar único, distinto y poco
          conquistado. Allí, donde se confunde la Pampa y la Patagonia, al norte
          del Río Colorado, a 39° de latitud sur, muy cerca del Océano
          Atlántico, producimos vinos de alta calidad. Al Este Bodega & Viñedos
          representa el punto de partida para sumar al mapa vitivinícola mundial
          una nueva región argentina productora de vinos de alta calidad.
        </p>
        <p>
          Durante muchos años regían disposiciones proteccionistas que prohibían
          producir uva y vino, en la provincia de Buenos Aires. ​​
        </p>
        <p>
          El 1ro de diciembre del año 2000 iniciamos nuestra explotación. Ese
          día la Provincia de Buenos Aires rompió con 63 años de prohibición.
        </p>
      </motion.div>
      <motion.div
        className="relative w-1/2 h-full"
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
