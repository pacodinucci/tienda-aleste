import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { montserrat, oswald } from "@/lib/fonts";

const VinedoSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50% 0px" });

  return (
    <div ref={ref} className="h-full mx-6 pt-28 flex">
      <div className="w-1/2 bg-cuero flex justify-center flex-col">
        <motion.h1
          className={`${oswald.className} text-white uppercase text-5xl z-20 px-16 py-4`}
          initial={{ x: -100, opacity: 1 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          Viñedo
        </motion.h1>
        <motion.div
          className={`text-white text-lg px-16 py-12 z-10 tracking-wide leading-8 flex flex-col gap-y-4 ${montserrat.className}`}
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p>
            Las viñas de Al Este se extienden sobre 25 hectáreas en esta región
            del sudoeste bonaerense de suelo arenoso y excelente drenaje.
          </p>
          <p>
            Fueron implantadas las variedades tintas Malbec, Tannat, Cabernet
            Sauvignon y Merlot y las blancas Chardonnay y Sauvignon Blanc. Todas
            ellas fueron injertadas sobre pie americano.
          </p>
          <p>
            El sistema de producción es sobre espalderos altos, con un promedio
            de 3.300 plantas por hectárea. Todo el viñedo cuenta con sistema de
            riego por goteo.
          </p>
        </motion.div>
      </div>
      <motion.div
        className="w-1/2 relative"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/fondomedano.png"
            alt="viñedo al este"
            layout="fill"
            objectFit="cover"
            objectPosition="right"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default VinedoSection;
