import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { montserrat, oswald } from "@/lib/fonts";

const VinedoSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50% 0px" });

  return (
    <div
      ref={ref}
      className="h-screen mx-6 flex flex-col mt-16 md:flex-row relative overflow-x-hidden"
    >
      <motion.div
        className="absolute inset-0 h-full w-full md:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/fondomedano.png"
          alt="viñedo al este"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-darkCustom/50" />
      </motion.div>
      <div
        className={`relative bg-darkCustom md:bg-opacity-100 bg-opacity-0 text-white text-lg px-6 py-8 md:px-10 md:py-12 w-full h-full md:w-1/2 z-10 tracking-wide leading-8 flex flex-col justify-center items-center gap-y-4 ${montserrat.className}`}
      >
        <motion.h1
          className={`${oswald.className} text-white uppercase text-4xl md:text-5xl z-20 px-4 py-4`}
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          Viñedo
        </motion.h1>
        <motion.div
          className={`text-white text-lg z-10 tracking-wide leading-8 flex flex-col gap-y-4 ${montserrat.className}`}
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
        className="relative hidden md:block w-1/2 h-full"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/fondomedano.png"
          alt="viñedo al este"
          layout="fill"
          objectFit="cover"
          objectPosition="right"
        />
      </motion.div>
    </div>
  );
};

export default VinedoSection;
