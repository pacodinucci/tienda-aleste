"use client";

import "@/app/globals.css";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Landing from "@/components/landing";
import VisionSection from "@/components/vision";
import Navbar from "@/components/navbar";
import TerroirSection from "@/components/terroir";
import VinedoSection from "@/components/vinedo";
import BodegaSection from "@/components/bodega";
import VinosSection from "@/components/vinos";
import VideoSection from "@/components/video";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const firstSectionRef = useRef<HTMLDivElement>(null);

  const handleIngresarClick = () => {
    const section2 = document.getElementById("section2");
    if (section2) {
      section2.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (mainRef.current) {
      setCanScroll(mainRef.current.scrollHeight > mainRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("First section is visible");
            setShowNavbar(false);
          } else {
            console.log("First section is not visible");
            setShowNavbar(true);
          }
        });
      },
      { threshold: 0.8 }
    );

    const currentFirstSectionRef = firstSectionRef.current;
    if (currentFirstSectionRef) {
      observer.observe(currentFirstSectionRef);
    }

    return () => {
      if (currentFirstSectionRef) {
        observer.unobserve(currentFirstSectionRef);
      }
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className={`relative snap-y snap-mandatory ${
        isChecked ? "overflow-y-scroll" : "overflow-y-hidden"
      } h-full bg-brownCustom scrollbar-custom`}
    >
      <AnimatePresence>{showNavbar && <Navbar />}</AnimatePresence>
      <section className="snap-start" ref={firstSectionRef}>
        <Landing
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          handleIngresarClick={handleIngresarClick}
        />
      </section>
      <section id="section2" className="h-screen snap-start">
        <VisionSection />
      </section>
      <section id="terroir" className="h-screen snap-start overflow-hidden">
        <TerroirSection />
      </section>
      <section id="vinedo" className="h-screen snap-start">
        <VinedoSection />
      </section>
      <section id="bodega" className="h-screen snap-start">
        <BodegaSection />
      </section>
      <section className="h-screen snap-start">
        <VideoSection />
      </section>
      <section id="vinos" className="h-screen snap-start">
        <VinosSection />
      </section>
      <section id="visitas" className="h-screen snap-start">
        {/* <VisitasSection /> */} Visitas
      </section>
    </main>
  );
}
