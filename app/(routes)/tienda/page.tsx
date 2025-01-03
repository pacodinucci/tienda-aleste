import Image from "next/image";

import Navbar from "@/components/navbar";
import { oswald } from "@/lib/fonts";
import TiendaCarousel from "./components/carousel";
import db from "@/lib/db";
import MobileCarousel from "./components/mobile-carousel";
import Banners from "./components/banners";

const TiendaPage = async () => {
  const products = await db.product.findMany({
    where: {
      available: true,
    },
  });

  return (
    <div className="min-h-screen">
      <div className="w-full h-[25vh] md:h-[40vh] relative">
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
      <div className="px-0 md:px-28 mt-28 pb-28">
        <h1
          className={`${oswald.className} text-center uppercase text-neutral-700 text-5xl tracking-wide mb-16`}
        >
          Nuestros vinos
        </h1>
        <TiendaCarousel products={products} />
        <MobileCarousel products={products} />
        <Banners />
      </div>
    </div>
  );
};

export default TiendaPage;
