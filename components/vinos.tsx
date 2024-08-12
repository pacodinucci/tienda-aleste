import { montserrat } from "@/lib/fonts";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const VinosSection = () => {
  return (
    <div className="h-screen md:h-full flex flex-col md:flex-row px-2 md:px-6 pt-10 relative">
      {/* Contenido para pantallas grandes */}
      <div
        className={`${montserrat.className} hidden md:flex w-1/2 bg-darkCustom text-white text-lg p-12 flex-col gap-y-6 justify-center items-center`}
      >
        <p>
          En los comienzos, el reconocido enólogo italiano, Alberto Antonini fue
          quien estableció los primeros parámetros para la elaboración de los
          vinos de Al Este, escuela que se ha internalizado y que continúa
          aplicándose hasta el presente. Veinte años de experiencia han
          permitido sortear adversidades y perfeccionar los métodos de
          vinificación.
        </p>
        <p>
          Actualmente, los vinos son eleborados con la visión de Daniel Di
          Nucci, fundador de la bodega, y la supervisión del enólogo César
          Cárdenas. La pasión y el trabajo de todo el equipo de Al Este
          potenciados por las cualidades y características del terroir se ven
          reflejados en nuestros vinos.
        </p>
        <p>
          Para conocer en detalle nuestros vinos, podés visitar nuestra tienda
          online.
        </p>
        <Button
          className={`${montserrat.className} rounded-none hover:bg-midBrownCustom/80 self-start bg-midBrownCustom uppercase tracking-wide text-bas`}
        >
          Ir a la tienda online
        </Button>
      </div>
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/copa.png"
          alt="vino al este"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
        />
      </div>

      {/* Contenido para pantallas móviles */}
      <div className="md:hidden relative w-full h-full">
        <Image
          src="/copa.png"
          alt="vino al este"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          className="absolute inset-0 z-0"
        />
        <div
          className={`${montserrat.className} absolute inset-0 bg-darkCustom bg-opacity-60 text-white text-lg p-12 flex flex-col gap-y-6 justify-center items-center`}
        >
          <p className="hidden md:block">
            En los comienzos, el reconocido enólogo italiano, Alberto Antonini
            fue quien estableció los primeros parámetros para la elaboración de
            los vinos de Al Este, escuela que se ha internalizado y que continúa
            aplicándose hasta el presente. Veinte años de experiencia han
            permitido sortear adversidades y perfeccionar los métodos de
            vinificación.
          </p>
          <p className="md:hidden block">
            En los comienzos, el reconocido enólogo italiano, Alberto Antonini
            fue quien estableció los primeros parámetros para la elaboración de
            los vinos de Al Este, escuela que se ha internalizado y que continúa
            aplicándose hasta el presente.
          </p>
          <p className="hidden md:block">
            Actualmente, los vinos son eleborados con la visión de Daniel Di
            Nucci, fundador de la bodega, y la supervisión del enólogo César
            Cárdenas. La pasión y el trabajo de todo el equipo de Al Este
            potenciados por las cualidades y características del terroir se ven
            reflejados en nuestros vinos.
          </p>
          <p className="md:hidden block">
            Actualmente, los vinos son eleborados con la visión de Daniel Di
            Nucci, fundador de la bodega, y la supervisión del enólogo César
            Cárdenas.
          </p>
          <p>
            Para conocer en detalle nuestros vinos, podés visitar nuestra tienda
            online.
          </p>
          <Button
            className={`${montserrat.className} rounded-none hover:bg-midBrownCustom/80 self-start bg-midBrownCustom uppercase tracking-wide text-bas`}
          >
            Ir a la tienda online
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VinosSection;
