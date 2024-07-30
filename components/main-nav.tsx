import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { montserrat } from "@/lib/fonts";

interface MainNavProps {
  isMobile: boolean;
  setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainNav = ({ isMobile, setIsMenuOpen }: MainNavProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    href: string
  ) => {
    event.preventDefault();
    if (pathname !== "/") {
      router.push(href);
      if (isMobile && setIsMenuOpen) {
        setIsMenuOpen(false);
      }
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        if (isMobile && setIsMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]);

  return (
    <div>
      <ul
        className={`${montserrat.className} flex ${
          isMobile ? "flex-col gap-y-6 text-2xl" : "flex-row"
        } gap-x-8 uppercase items-center text-white tracking-wide`}
      >
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link
            href="/#terroir"
            onClick={(e) => handleClick(e, "terroir", "/#terroir")}
          >
            Terroir
          </Link>
        </li>
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link
            href="/#vinedo"
            onClick={(e) => handleClick(e, "vinedo", "/#vinedo")}
          >
            Viñedo
          </Link>
        </li>
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link
            href="/#bodega"
            onClick={(e) => handleClick(e, "bodega", "/#bodega")}
          >
            Bodega
          </Link>
        </li>
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link
            href="/#vinos"
            onClick={(e) => handleClick(e, "vinos", "/#vinos")}
          >
            Vinos
          </Link>
        </li>
        <li className="hover:text-darkCustom/50 transition-colors">
          <Link
            href="/#visitas"
            onClick={(e) => handleClick(e, "visitas", "/#visitas")}
          >
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
