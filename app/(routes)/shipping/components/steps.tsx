import React from "react";
import { oswald } from "@/lib/fonts";

const Steps = () => {
  return (
    <div>
      <div className="flex items-center justify-center mt-28 mb-16">
        <div className="flex">
          <span
            className={`${oswald.className} bg-brownCustom text-white p-2 rounded-full w-10 h-10 flex items-center justify-center relative`}
          >
            1
            <p className="absolute top-12 left-1/2 transform -translate-x-1/2 text-neutral-800 uppercase text-xs">
              Envío
            </p>
          </span>
          <div className="flex items-center justify-center w-24 relative">
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-brownCustom"></div>
          </div>
          <span
            className={`${oswald.className} bg-brownCustom text-white p-2 rounded-full w-10 h-10 flex items-center justify-center relative`}
          >
            2
            <p className="absolute top-12 left-1/2 transform -translate-x-1/2 text-neutral-800 uppercase text-xs">
              Pago
            </p>
          </span>
          <div className="flex items-center justify-center w-24 relative">
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-brownCustom"></div>
          </div>
          <span
            className={`${oswald.className} bg-brownCustom text-white p-2 rounded-full w-10 h-10 flex items-center justify-center relative`}
          >
            3
            <p className="absolute top-12 left-1/2 transform -translate-x-1/2 text-neutral-800 uppercase text-xs">
              Confirmación
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Steps;
