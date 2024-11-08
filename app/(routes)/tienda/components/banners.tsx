import { montserrat } from "@/lib/fonts";
import Image from "next/image";
import React from "react";

const Banners = () => {
  return (
    <div className="pt-48 flex items-center justify-center gap-x-8">
      <div className="flex flex-col md:flex-row gap-4 overflow-hidden">
        <div className="w-[80vw] md:w-[30vw] h-40 relative cursor-pointer overflow-hidden group">
          <Image
            src="/barrica.png"
            alt="barrica propia al este"
            layout="fill"
            objectFit="cover"
            objectPosition="45% 50%"
            className="transition-transform duration-500 ease-in-out transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
          <h3
            className={`${montserrat.className} absolute inset-0 flex items-center justify-center text-white text-2xl font-medium uppercase`}
          >
            Barrica propia
          </h3>
        </div>
        <div className="w-[80vw] md:w-[30vw] h-40 relative cursor-pointer overflow-hidden group">
          <Image
            src="/botellas.png"
            alt="barrica propia al este"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            className="transition-transform duration-500 ease-in-out transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
          <h3
            className={`${montserrat.className} absolute inset-0 flex items-center justify-center text-white text-2xl font-medium uppercase text-center`}
          >
            Vinos personalizados
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Banners;
