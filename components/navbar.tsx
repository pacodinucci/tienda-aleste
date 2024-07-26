import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import MainNav from "./main-nav";
import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-midBrownCustom shadow-md z-50 flex justify-between items-center px-6 py-2"
    >
      <div>
        <Image
          src="/logogaviotas.svg"
          alt="logo bodega al este"
          width={100}
          height={100}
        />
        {/* <Image
          src="/alesteposta.svg"
          alt="logo bodega al este"
          width={140}
          height={140}
        /> */}
      </div>
      <div>
        <MainNav />
      </div>
      <div>
        <ShoppingBag size={20} className="text-white cursor-pointer" />
      </div>
    </motion.nav>
  );
};

export default Navbar;
