"use client";

import { montserrat, oswald } from "@/lib/fonts";
import React, { useEffect, useState } from "react";
import ShippingForm from "./components/shipping-form";
import Steps from "@/components/steps";
import Summary from "./components/summary";
import Navbar from "@/components/navbar";
import { FormProvider } from "@/context/shipping-form-context";

const ShippingPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Steps />
      <FormProvider>
        <div className="flex-1 flex mb-24">
          <div className="flex-1 flex flex-col border-r border-gray-300">
            <ShippingForm />
          </div>
          <div className="flex-1 flex flex-col">
            <Summary />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default ShippingPage;
