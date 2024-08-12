import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const TiendaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default TiendaLayout;
