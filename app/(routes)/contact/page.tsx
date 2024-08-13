import React from "react";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { montserrat, oswald } from "@/lib/fonts";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/footer";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {/* Sección izquierda: Imagen */}
        <div className="w-1/2 h-full fixed top-0 left-0">
          <Image
            src="/cava.png"
            alt="cava bodega al este"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>

        {/* Sección derecha: Información de contacto */}
        <div className="bg-brownCustom w-1/2 ml-auto overflow-y-auto p-8 pt-24">
          <div className="pl-8">
            <h1
              className={`${oswald.className} uppercase text-4xl text-darkCustom mb-4`}
            >
              Contacto
            </h1>
            <Separator className="bg-darkCustom h-[3px]" />
            <div className="py-6">
              <h3
                className={`${montserrat.className} text-2xl text-neutral-800 font-semibold`}
              >
                Para reservas y consultas:
              </h3>
              <p
                className={`${montserrat.className} text-xl text-neutral-800 py-4`}
              >
                info@bodegaaleste.com.ar
              </p>
              <p
                className={`${montserrat.className} text-xl text-neutral-800 py-4`}
              >
                +54 11 4444 4444
              </p>
              <p
                className={`${montserrat.className} text-xl text-neutral-800 py-4`}
              >
                Ruta Nacional 22 Km. 738
                <br />
                Médanos, Partido de Villarino, Provincia de Buenos Aires,
                Argentina.
              </p>
            </div>

            <div className="mb-8">
              <h2
                className={`${oswald.className} uppercase text-4xl text-darkCustom mb-4`}
              >
                Ubicación
              </h2>
              <Separator className="bg-darkCustom h-[3px]" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.059432479134!2d-62.67109448544246!3d-38.88268697957721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95e63fb8a5cf2293%3A0xa4c564d2268b2c5f!2s58P4%2B77%20M%C3%A9danos%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sar!4v1691865649128!5m2!1ses!2sar"
                width="100%"
                height="400"
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
                className="border-0 py-6"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
