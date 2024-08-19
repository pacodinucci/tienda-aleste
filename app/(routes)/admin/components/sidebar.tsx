"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  Plus,
  Settings,
  ShoppingBag,
  Package,
  User,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
      pro: false,
    },
    {
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      label: "Dashboard",
      pro: false,
    },
    {
      icon: ShoppingBag,
      href: "/admin/products",
      label: "Productos",
      pro: true,
    },
    {
      icon: Package,
      href: "/admin/orders",
      label: "Ordenes",
      pro: false,
    },
    {
      icon: User,
      href: "/settings",
      label: "Clientes",
      pro: false,
    },
  ];

  const onNavigate = (url: string, pro: boolean) => {
    // TODO: Chaeck if pro

    return router.push(url);
  };

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-slate-950">
      <div className="pt-6 pl-6">
        <Image
          src="/logogaviotas.svg"
          alt="logo al este"
          width={100}
          height={100}
        />
      </div>
      <div className="p-3 flex flex-1">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              key={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 justify-start font-medium cursor-pointer hover:text-white hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-white"
              )}
              onClick={() => onNavigate(route.href, route.pro)}
            >
              <div className="flex gap-x-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
