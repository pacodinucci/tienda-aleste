import React from "react";
import Link from "next/link";
import { montserrat } from "@/lib/fonts";

interface MainNavProps {
  isMobile: boolean;
  setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainNav = ({ isMobile, setIsMenuOpen }: MainNavProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      if (isMobile && setIsMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <div>
      <ul
        className={`${montserrat.className} flex ${
          isMobile ? "flex-col gap-y-6 text-2xl" : "flex-row"
        } gap-x-8 uppercase items-center text-white tracking-wide`}
      >
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link href="#terroir" onClick={(e) => handleClick(e, "terroir")}>
            Terroir
          </Link>
        </li>
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link href="#vinedo" onClick={(e) => handleClick(e, "vinedo")}>
            Viñedo
          </Link>
        </li>
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link href="#bodega" onClick={(e) => handleClick(e, "bodega")}>
            Bodega
          </Link>
        </li>
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link href="#vinos" onClick={(e) => handleClick(e, "vinos")}>
            Vinos
          </Link>
        </li>
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link href="#visitas" onClick={(e) => handleClick(e, "visitas")}>
            Visitas
          </Link>
        </li>
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link href="/contacto">Contacto</Link>
        </li>
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link href="/tienda">Tienda online</Link>
        </li>
      </ul>
    </div>
  );
};

export default MainNav;
