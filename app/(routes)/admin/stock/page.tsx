import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const StockPage = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Stock de productos</h2>
        <Button>Agregar Remito</Button>
      </div>
    </div>
  );
};

export default StockPage;
