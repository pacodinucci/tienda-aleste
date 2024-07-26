import Image from "next/image";
import React from "react";
import { montserrat } from "@/lib/fonts";

const VisionSection = () => {
  return (
    <div className="h-full relative mx-6">
      <div
        className={`bg-darkCustom rounded-sm absolute top-32 left-12 text-white text-xl font-semibold px-10 py-12 w-[70%] z-10 tracking-wide leading-8 flex flex-col gap-y-4 ${montserrat.className}`}
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
          El 1 de diciembre del año 2000 iniciamos nuestra explotación. Ese día
          la Provincia de Buenos Aires rompió con 63 años de prohibición.
        </p>
      </div>
      <div className="absolute bottom-0 right-0">
        <Image
          src="/fondomedano.png"
          alt="al este vinos"
          width={1000}
          height={1000}
          className="rounded-sm"
        />
      </div>
    </div>
  );
};

export default VisionSection;
