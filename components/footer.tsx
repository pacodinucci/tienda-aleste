"use client";

import Image from "next/image";
import React from "react";
import {
  ArrowRight,
  MapPin,
  Phone,
  AtSign,
  Instagram,
  MessageCircle,
} from "lucide-react";

import { Input } from "./ui/input";
import { montserrat, oswald } from "@/lib/fonts";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <div className="bg-stone-900 md:h-96 md:px-20 flex flex-col md:flex-row gap-x-24 text-white mt-16">
      <div className="flex flex-col gap-y-10 pt-8 px-4">
        <div className="flex gap-y-4">
          <Image
            src="/logogaviotas-dark.svg"
            alt="logo bodega al este"
            width={100}
            height={0}
          />
          <Image
            src="/alestelogotipo-dark.svg"
            alt="logo bodega al este"
            width={140}
            height={0}
          />
        </div>
        <div className="w-[80vw] md:w-[25vw] flex flex-col gap-y-2">
          <p
            className={`${montserrat.className} text-sm font-medium text-brownCustom tracking-wide`}
          >
            Ingresá tu email para recibir información sobre nuestros nuevos
            productos, eventos, visitas y todas las experiencias que Bodega Al
            Este tiene para ofrecer!
          </p>
          <div className="border-2 border-brownCustom flex items-center gap-x-2">
            <Input
              type="email"
              className="bg-transparent text-darkCustom border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none focus-visible:outline-none placeholder:text-brownCustom"
              placeholder="Ingresá tu email..."
            />
            <ArrowRight size={40} className="text-brownCustom mr-2" />
          </div>
        </div>
      </div>
      <div className="p-8">
        <h2
          className={`${oswald.className} text-brownCustom uppercase text-xl tracking-wide mb-4`}
        >
          Links
        </h2>
        <ul
          className={`${montserrat.className} flex flex-col gap-y-2 text-brownCustom font-medium`}
        >
          <li className="cursor-pointer" onClick={() => router.push("/tienda")}>
            Tienda online
          </li>
          <li
            className="cursor-pointer"
            onClick={() => router.push("/contact")}
          >
            Contacto
          </li>
          <li
            className="cursor-pointer"
            onClick={() => router.push("/contact")}
          >
            Visitas
          </li>
          <li className="cursor-pointer">Medios de pago y envío</li>
          <li className="cursor-pointer">Políticas de privacidad</li>
          <li className="cursor-pointer">Términos y condiciones</li>
          <li className="cursor-pointer">Preguntas Frecuentes</li>
          <li className="cursor-pointer">Botón de arrepentimiento</li>
        </ul>
      </div>
      <div className="p-8">
        <h2
          className={`${oswald.className} text-brownCustom uppercase text-xl tracking-wide mb-4`}
        >
          Contacto
        </h2>
        <ul className="flex flex-col gap-y-4">
          <li className="flex gap-x-2 items-center">
            <MapPin />
            <p
              className={`${montserrat.className} tracking-wide text-brownCustom font-medium`}
            >
              Ruta Nac. 22 Km 738
            </p>
          </li>
          <li className="flex gap-x-2 items-center">
            <Phone />
            <p
              className={`${montserrat.className} tracking-wide text-brownCustom font-medium`}
            >
              +54 11 5804 3333
            </p>
          </li>
          <li className="flex gap-x-2 items-center">
            <AtSign />
            <p
              className={`${montserrat.className} tracking-wide text-brownCustom font-medium`}
            >
              info@bodegaaleste.com.ar
            </p>
          </li>
          <li className="flex gap-x-2">
            <span className="w-10 h-10 bg-midBrownCustom rounded-full flex justify-center items-center">
              <Instagram />
            </span>
            <span className="w-10 h-10 bg-midBrownCustom rounded-full flex justify-center items-center">
              <MessageCircle />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
