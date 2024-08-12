import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { montserrat, oswald } from "@/lib/fonts";

const TerroirSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80% 0px" });

  return (
    <div ref={ref} className="pt-16 px-6 relative h-full overflow-x-hidden">
      <motion.h1
        className={`${oswald.className} hidden md:block absolute top-36 left-10 text-white uppercase text-5xl z-20 bg-cuero px-4 py-4`}
        initial={{ x: -100, opacity: 1 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        Terroir
      </motion.h1>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="hidden md:block"
      >
        <Image
          src="/chardonnay.png"
          alt="chardonnay al este"
          width={700}
          height={0}
        />
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative block md:hidden h-full"
      >
        <Image
          src="/chardonnay.png"
          alt="chardonnay al este"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-darkCustom/50" />
      </motion.div>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex md:hidden flex-col justify-center items-center gap-y-4 mx-6 mt-10"
      >
        {/* <div className="absolute inset-0 bg-darkCustom bg-opacity-50 flex flex-col justify-center items-center text-center p-6"> */}
        <h1
          className={`${oswald.className} text-white uppercase text-4xl mb-4`}
        >
          Terroir
        </h1>
        <div
          className={`${montserrat.className} text-neutral-200 text-lg text-left leading-9 px-4`}
        >
          <p>
            Médanos se encuentra en el sudoeste de la Provincia de Buenos Aires,
            inmersa en un clima semiárido, con suelo arenoso, poca materia
            orgánica, subsuelo de material calcáreo (antiguo lecho marino).
          </p>
          <p>
            La temperatura máxima promedio en período estival de 33°C, vientos
            frecuentes del oeste que colaboran con la sanidad del cultivo ya que
            seca las vides después de lluvias o rocío matinal.
          </p>
          {/* <p>
              Amplitud térmica: las temperaturas promedio oscilan entre los 33°C
              y los 16°C, está dada por el tipo de suelo, los suelos arenosos se
              capentan mucho durante el día y se enfrían rápidamente durante la
              noche.
            </p> */}
          <p>
            Topografía: fluctúa entre llanos y médanos fijados por vegetación
            natural.
          </p>

          {/* <p>Altitud: 33 metros sobre el nivel del mar. </p> */}
          {/* <p>Latitud: 39° Sur.</p> */}
          {/* <p>Proximidad al mar: 40 Km.</p> */}
          {/* <p>
              Flora autóctona: levaduras indígenas que le imprimen al vino
              características propias, tienen gran aptitud para convertir altas
              concentraciones de azúcares.
            </p> */}
        </div>
        {/* </div> */}
      </motion.div>
      <motion.div
        className={`${montserrat.className} hidden z-10 w-[50%] md:flex flex-col gap-y-4 absolute top-36 right-32 text-neutral-200 bg-cuero p-10`}
        initial={{ x: 100, opacity: 1 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p>
          Médanos se encuentra en el sudoeste de la Provincia de Buenos Aires,
          inmersa en un clima semiárido, con suelo arenoso, poca materia
          orgánica, subsuelo de material calcáreo (antiguo lecho marino).
        </p>
        <p>
          La temperatura máxima promedio en período estival de 33°C, vientos
          frecuentes del oeste que colaboran con la sanidad del cultivo ya que
          seca las vides después de lluvias o rocío matinal.
        </p>
        <p>
          Amplitud térmica: las temperaturas promedio oscilan entre los 33°C y
          los 16°C, está dada por el tipo de suelo, los suelos arenosos se
          calientan mucho durante el día y se enfrían rápidamente durante la
          noche.
        </p>
        <p>
          Topografía: fluctúa entre llanos y médanos fijados por vegetación
          natural.
        </p>

        <p>Altitud: 33 metros sobre el nivel del nivel del mar. </p>
        <p>Latitud: 39° Sur.</p>
        <p>Proximidad al mar: 40 Km.</p>
        <p>
          Flora autóctona: levaduras indígenas que le imprimen al vino
          características propias, tienen gran aptitud para convertir altas
          concentraciones de azúcares.
        </p>
      </motion.div>
    </div>
  );
};

export default TerroirSection;
