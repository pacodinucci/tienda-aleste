"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, AlignJustify, CircleArrowLeft } from "lucide-react";
import MainNav from "./main-nav";
import SemiCart from "./semicart";
import useCartStore from "@/hooks/use-cart-store";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const semiCartRef = useRef<HTMLDivElement>(null);
  const cartIconRef = useRef<HTMLDivElement>(null);

  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItemsSum = useCartStore((state) => state.cart.length);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const setCartClose = useCartStore((state) => state.setCartClose);

  let closeTimeout: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setCartOpen(); // Abre el carrito
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      if (
        !cartIconRef.current?.contains(document.activeElement) &&
        !semiCartRef.current?.contains(document.activeElement)
      ) {
        setCartClose(); // Cierra el carrito
      }
    }, 300); // Retardo de 300ms para cerrar el SemiCart
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {!isMobile ? (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 bg-midBrownCustom shadow-md z-40 flex justify-between items-center px-6 py-2"
        >
          <div>
            <Link href={"/"}>
              <Image
                src="/logogaviotas.svg"
                alt="logo bodega al este"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div>
            <MainNav isMobile={isMobile} />
          </div>
          <div
            className="relative p-2"
            ref={cartIconRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ShoppingBag
              size={20}
              className="text-white cursor-pointer hover:text-brownCustom"
              onClick={toggleCart}
            />
            {cartItemsSum > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
                {cartItemsSum}
              </span>
            )}
          </div>
        </motion.nav>
      ) : (
        <>
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 bg-midBrownCustom shadow-md z-40 flex justify-between items-center px-2 py-2"
          >
            <div onClick={toggleMenu}>
              <AlignJustify className="text-white w-25 mx-2 cursor-pointer" />
            </div>
            <div onClick={() => router.push("/")}>
              <Image
                src="/logogaviotas.svg"
                alt="logo bodega al este"
                width={75}
                height={75}
              />
            </div>
          </motion.nav>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                exit={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 w-full h-full bg-midBrownCustom z-40 flex justify-center items-center"
              >
                <div className="absolute top-4 left-4">
                  <CircleArrowLeft
                    className="text-white"
                    size={40}
                    strokeWidth={1.5}
                    onClick={() => setIsMenuOpen(false)}
                  />
                </div>
                <div className="flex flex-col items-center gap-y-8">
                  <Image
                    src="/logogaviotas.svg"
                    alt="logo bodega al este"
                    width={100}
                    height={100}
                  />
                  <MainNav isMobile={isMobile} setIsMenuOpen={setIsMenuOpen} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
      <div
        ref={semiCartRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SemiCart />
      </div>
    </>
  );
};

export default Navbar;
