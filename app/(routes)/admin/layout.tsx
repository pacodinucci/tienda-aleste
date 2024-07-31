"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";

import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import Image from "next/image";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isSignedIn === undefined) {
      return;
    }

    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
      router.push("/admin/dashboard");
      setLoading(false);
    }
  }, [isSignedIn, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-4 h-screen bg-slate-900">
        <Image
          src="/logogaviotas.svg"
          alt="logo al este"
          width={150}
          height={0}
        />
        <div className="text-white text-xl">
          <BarLoader color="#ffffff" />
        </div>{" "}
        {/* Aquí puedes agregar tu spinner de carga */}
      </div>
    );
  }

  return (
    <div className="min-h-full flex">
      <div className="hidden md:flex w-1/6 flex-col inset-y-0">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
        <main className="md:pl-10 md:pr-8 pt-10 relative">
          {/* <Toaster richColors /> */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
