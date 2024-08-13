"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { montserrat, oswald } from "@/lib/fonts";

interface SectionData {
  title: string;
  text: string[];
  imageUrl: string;
}

interface SectionComponentProps {
  data: SectionData;
  reverse?: boolean;
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  data,
  reverse = false,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -50px 0px",
  });

  const refMobile = useRef(null);
  const isInViewMobile = useInView(refMobile, {
    once: true,
    margin: "0px 0px -50% 0px",
  });

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
    <div>
      {/* Para pantallas medianas y grandes */}
      <div
        className={`hidden md:flex bg-brownCustom px-6 py-16 ${
          reverse ? "flex-row-reverse" : ""
        }`}
        ref={ref}
      >
        {/* Sección de la Imagen */}
        <motion.div
          className="w-1/2 flex-shrink-0"
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={data.imageUrl}
            alt={data.title}
            width={700}
            height={0}
            className="object-cover w-full h-full"
            layout="responsive"
          />
        </motion.div>
        {/* Sección del Texto */}
        <motion.div
          className="w-1/2 bg-darkCustom p-8 pb-24 text-white flex flex-col justify-center gap-y-6"
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={`${oswald.className} text-white uppercase text-4xl text-center md:text-5xl z-20 py-4`}
          >
            {data.title}
          </h2>
          <div
            className={`text-white text-base z-10 tracking-wide leading-8 flex flex-col gap-y-4 ${montserrat.className}`}
          >
            {data.text.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Para pantallas pequeñas */}
      <motion.div
        className="md:hidden relative bg-darkCustom/50 h-screen mt-12 mx-2"
        ref={refMobile}
        initial={{ x: -100, opacity: 0 }}
        animate={isInViewMobile ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <Image
            src={data.imageUrl}
            alt={data.title}
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
        </div>
        {/* Sección del Texto */}
        <div className="relative z-10 bg-darkCustom/30 px-8 py-8 text-white flex flex-col gap-y-6 h-full">
          <h2
            className={`${oswald.className} text-white uppercase text-4xl text-center z-20 py-4`}
          >
            {data.title}
          </h2>
          <div
            className={`text-white text-lg tracking-wide leading-8 flex flex-col gap-y-4 ${montserrat.className}`}
          >
            {data.text
              .slice(0, isShortScreen ? 1 : 2)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionComponent;
