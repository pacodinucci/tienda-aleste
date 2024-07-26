import React from "react";
import Link from "next/link";
import { montserrat } from "@/lib/fonts";

const MainNav = () => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <ul
        className={`${montserrat.className} flex gap-x-8 uppercase items-center text-white tracking-wide`}
      >
        <li>
          <Link href="#terroir" onClick={(e) => handleClick(e, "terroir")}>
            Terroir
          </Link>
        </li>
        <li>
          <Link href="#vinedo" onClick={(e) => handleClick(e, "vinedo")}>
            Viñedo
          </Link>
        </li>
        <li>
          <Link href="#bodega" onClick={(e) => handleClick(e, "bodega")}>
            Bodega
          </Link>
        </li>
        <li>
          <Link href="#vinos" onClick={(e) => handleClick(e, "vinos")}>
            Vinos
          </Link>
        </li>
        <li>
          <Link href="#visitas" onClick={(e) => handleClick(e, "visitas")}>
            Visitas
          </Link>
        </li>
        <li>
          <Link href="/contacto">Contacto</Link>
        </li>
        <li>
          <Link href="/tienda">Tienda online</Link>
        </li>
      </ul>
    </div>
  );
};

export default MainNav;
