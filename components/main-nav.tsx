import React from "react";
import Link from "next/link";
import { montserrat } from "@/lib/fonts";

const MainNav = () => {
  return (
    <div>
      <ul
        className={`${montserrat.className} flex gap-x-8 uppercase items-center text-white tracking-wide`}
      >
        <li className="hover:text-slate-100">
          <Link href="#terroir">Terroir</Link>
        </li>
        <li className="hover:text-slate-100">
          <Link href="#vinedo">Viñedo</Link>
        </li>
        <li className="hover:text-slate-100">
          <Link href="#bodega">Bodega</Link>
        </li>
        <li className="hover:text-slate-100">
          <Link href="#vinos">Vinos</Link>
        </li>
        <li className="hover:text-slate-100">
          <Link href="#visitas">Visitas</Link>
        </li>
        <li className="hover:text-slate-100">
          <Link href="/contacto">Contacto</Link>
        </li>
        <li className="hover:text-slate-100">
          <Link href="/tienda">Tienda online</Link>
        </li>
      </ul>
    </div>
  );
};

export default MainNav;
