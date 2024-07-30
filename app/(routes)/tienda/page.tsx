"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { montserrat, oswald } from "@/lib/fonts";

const TiendaPage = () => {
  const provisorio = [
    {
      title: "TERRASABBIA Gran Reserva Malbec",
      cosecha: "2021",
      caja: 6,
      precio: "20000",
      src: "/reservamalbec.jpg",
      discount: "20",
      available: true,
    },
    {
      title: "TERRASABBIA Gran Reserva Tannat",
      cosecha: "2022",
      caja: 6,
      precio: "15000",
      src: "/reservatannat.jpg",
      discount: "",
      available: true,
    },
    {
      title: "TERRASABBIA Chardonnay",
      cosecha: "2024",
      caja: 6,
      precio: "10000",
      src: "/terrasabbiachardonnay.jpg",
      discount: "",
      available: true,
    },
    {
      title: "TERRASABBIA Tannat",
      cosecha: "2023",
      caja: 6,
      precio: "12000",
      src: "/terrasabbiatannat.jpg",
      discount: "25",
      available: true,
    },
    {
      title: "TERRASABBIA Gran Reserva Malbec",
      cosecha: "2021",
      caja: 6,
      precio: "20000",
      src: "/reservamalbec.jpg",
      discount: "25",
      available: true,
    },
    {
      title: "TERRASABBIA Gran Reserva Tannat",
      cosecha: "2022",
      caja: 6,
      precio: "15000",
      src: "/reservatannat.jpg",
      discount: "",
      available: true,
    },
    {
      title: "TERRASABBIA Chardonnay",
      cosecha: "2024",
      caja: 6,
      precio: "10000",
      src: "/terrasabbiachardonnay.jpg",
      discount: "",
      available: true,
    },
    {
      title: "TERRASABBIA Tannat",
      cosecha: "2023",
      caja: 6,
      precio: "12000",
      src: "/terrasabbiatannat.jpg",
      discount: "",
      available: true,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      const totalItems = provisorio.length;
      if (currentIndex < totalItems - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-full h-[40vh] relative">
        <Image
          src="/fondocava.png"
          alt="cava medanos al este"
          layout="fill"
          objectFit="cover"
          objectPosition="center 15%"
        />
        <h1
          className={`${oswald.className} absolute bottom-5 left-10 uppercase tracking-wide text-white text-5xl`}
        >
          Tienda Al Este
        </h1>
      </div>
      <div className="px-28 mt-28 pb-28">
        <h1
          className={`${oswald.className} text-center uppercase text-neutral-700 text-5xl tracking-wide mb-16`}
        >
          Nuestros vinos
        </h1>
        <div className="relative group">
          <button
            onClick={handlePrev}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-midBrownCustom text-white p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              currentIndex === 0
                ? "cursor-not-allowed bg-midBrownCustom/30"
                : ""
            }`}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <div
            className="flex overflow-hidden"
            style={{ width: "100%" }}
            ref={carouselRef}
          >
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / provisorio.length)
                }%)`,
              }}
            >
              {provisorio.map((item, index) => (
                <div
                  key={item.src}
                  className="flex-shrink-0 w-1/6 p-2 flex justify-center items-center flex-col gap-y-4"
                >
                  <div className="relative w-full h-80 overflow-hidden flex flex-col text-center justify-center items-center gap-y-4">
                    <Image
                      src={item.src}
                      alt={item.src}
                      layout="fill"
                      objectFit="cover"
                      className="cursor-pointer hover:scale-125 transition-all duration-500"
                    />
                    {item.discount && (
                      <span className="w-16 h-16 flex items-center justify-center p-3 rounded-full text-white font-medium absolute top-5 left-5 bg-gradient-to-r from-amber-600 to-orange-800">
                        {item.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="text-center cursor-pointer">
                    <p
                      className={`${montserrat.className} w-56 hover:text-midBrownCustom`}
                    >
                      {item.title} &mdash; {`Caja (${item.caja}u)`}
                    </p>
                    <p className="text-lg font-semibold">
                      {item.discount ? (
                        <>
                          <span className="text-neutral-500 font-light line-through mr-2">
                            {new Intl.NumberFormat("es-AR", {
                              style: "currency",
                              currency: "ARS",
                              //   minimumFractionDigits: 0,
                              //   maximumFractionDigits: 0,
                            }).format(Number(item.precio) * item.caja)}
                          </span>
                          <span>
                            {new Intl.NumberFormat("es-AR", {
                              style: "currency",
                              currency: "ARS",
                              //   minimumFractionDigits: 0,
                              //   maximumFractionDigits: 0,
                            }).format(
                              Number(item.precio) *
                                item.caja *
                                (1 - Number(item.discount) / 100)
                            )}
                          </span>
                        </>
                      ) : (
                        new Intl.NumberFormat("es-AR", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(Number(item.precio) * item.caja)
                      )}
                    </p>
                  </div>
                  <Button
                    className={`${montserrat.className} rounded-none bg-midBrownCustom hover:bg-midBrownCustom/80 uppercase tracking-wide`}
                  >
                    Agregar al carrito
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-midBrownCustom text-white p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              currentIndex === provisorio.length - 1
                ? "cursor-not-allowed bg-midBrownCustom/30"
                : ""
            }`}
            disabled={currentIndex === provisorio.length - 1}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TiendaPage;
