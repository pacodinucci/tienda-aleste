"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
// import { Toaster } from "@/components/ui/sonner";

import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";

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
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div> {/* Aquí puedes agregar tu spinner de carga */}
      </div>
    );
  }

  return (
    <div className="h-full flex">
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
