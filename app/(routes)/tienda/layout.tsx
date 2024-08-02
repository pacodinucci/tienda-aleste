import React from "react";
import Navbar from "@/components/navbar";

const TiendaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default TiendaLayout;
