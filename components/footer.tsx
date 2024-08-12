import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";

import { Input } from "./ui/input";
import { montserrat } from "@/lib/fonts";

const Footer = () => {
  return (
    <div className="bg-midBrownCustom h-96 px-20 flex gap-x-12 text-white mt-16">
      <div className="flex flex-col gap-y-10 pt-8 px-4 border border-red-500">
        <div className="flex gap-y-4">
          <Image
            src="/logogaviotas.svg"
            alt="logo bodega al este"
            width={100}
            height={0}
          />
          <Image
            src="/alestelogotipo.svg"
            alt="logo bodega al este"
            width={140}
            height={0}
          />
        </div>
        <div className="w-96 flex flex-col gap-y-2">
          <p
            className={`${montserrat.className} text-sm text-neutral-800 tracking-wide`}
          >
            Ingresá tu email para recibir información sobre nuestros nuevos
            productos, eventos, visitas y todas las experiencias que Bodega Al
            Este tiene para ofrecer!
          </p>
          <div className="border-2 border-darkCustom flex items-center gap-x-2">
            <Input className="bg-transparent border-none" />
            <ArrowRight size={40} className="text-darkCustom mr-2" />
          </div>
        </div>
      </div>
      <div>Links</div>
      <div>Contact us</div>
    </div>
  );
};

export default Footer;
