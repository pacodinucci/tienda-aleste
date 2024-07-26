import Image from "next/image";
import { montserrat, playfair, oswald } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CircleArrowDown } from "lucide-react";
import { useState } from "react";

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
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <section className="h-screen snap-start flex pt-24">
      <div className="bg-brotes bg-cover absolute inset-0 mx-6 mb-6" />
      <div className="absolute inset-0 bg-darkCustom opacity-40 mx-6 mb-6" />
      <motion.div
        className="z-10 inline-flex flex-col items-center w-1/2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/logogaviotas.svg"
          alt="logo al este"
          width={200}
          height={200}
        />
        <Image
          src="/alestelogotipo.svg"
          alt="logo al este"
          width={500}
          height={500}
        />
      </motion.div>
      <div className="w-1/2 flex justify-center items-start z-10">
        <motion.div
          className="p-10 flex flex-col gap-y-8 rounded-sm"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className={`${oswald.className} text-white text-5xl tracking-wide font-medium uppercase`}
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
            <div className="relative mt-16">
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
