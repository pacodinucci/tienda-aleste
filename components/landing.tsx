"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import { CircleArrowDown } from "lucide-react";
import { motion } from "framer-motion";

import { montserrat, oswald } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

interface LandingProps {
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
  handleIngresarClick: () => void;
}

const Landing: React.FC<LandingProps> = ({
  isChecked,
  setIsChecked,
  handleIngresarClick,
}) => {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleImageLoad = () => {
    setIsBackgroundLoaded(true);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="h-screen snap-start flex flex-col pt-32 md:flex-row">
      {!isBackgroundLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-darkCustom z-50">
          <BarLoader color="#ffffff" />
        </div>
      )}
      <div className="absolute inset-0 mx-2 md:mx-6 mb-0 md:mb-6">
        <Image
          src="/brotes.webp"
          alt="brotes al este"
          layout="fill"
          objectFit="cover"
          onLoadingComplete={handleImageLoad}
        />
      </div>
      <div
        className={`absolute inset-0 bg-darkCustom opacity-40 mx-2 md:mx-6 mb-0 md:mb-6 ${
          isBackgroundLoaded ? "block" : "hidden"
        }`}
      />
      <motion.div
        className={`z-10 inline-flex flex-col items-center w-full md:w-1/2 ${
          !isBackgroundLoaded ? "hidden" : ""
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/logogaviotas.svg"
          alt="logo al este"
          width={isMobile ? 100 : 200}
          height={isMobile ? 100 : 200}
        />
        <Image
          src="/alestelogotipo.svg"
          alt="logo al este"
          width={isMobile ? 250 : 500}
          height={isMobile ? 250 : 500}
        />
      </motion.div>
      <div
        className={`w-full md:w-1/2 flex justify-center items-start z-10 ${
          !isBackgroundLoaded ? "hidden" : ""
        }`}
      >
        <motion.div
          className="p-10 flex flex-col gap-y-8 rounded-sm"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className={`${oswald.className} text-white text-2xl md:text-5xl tracking-wide font-medium uppercase`}
          >
            Bienvenido / Welcome
          </h1>
          <div className="flex flex-col gap-3">
            <div className="flex items-center bg-black/40 rounded-sm px-4 py-2">
              <input
                type="checkbox"
                id="ageCheck"
                className="mr-4 h-6 w-6 accent-green-800"
                onChange={handleCheckboxChange}
              />
              <label
                className={`${montserrat.className} text-white font-light `}
              >
                Soy mayor de edad para beber. / I&apos;m of legal drinking age.
              </label>
            </div>
            <div className="relative mt-8 md:mt-16">
              <Button
                variant="ingresar"
                className={`${montserrat.className} self-center uppercase tracking-widest relative`}
                disabled={!isChecked}
                onClick={handleIngresarClick}
                style={{
                  width: isChecked ? "180px" : "150px",
                  transition: "width 0.4s",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <span>Ingresar</span>
                {isChecked && (
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block text-white ml-2"
                  >
                    <CircleArrowDown size={20} />
                  </motion.span>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Landing;
