"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import StockClient from "./components/client";
import useProductStore from "@/hooks/use-products-store";
import { StockColumn } from "./components/columns";

type Props = {};

const StockPage = (props: Props) => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const stockFormat: StockColumn[] = products.map((item) => ({
    id: item.id || "",
    title: item.title,
    stock: item.stock,
    src: item.src,
    year: item.year,
    updatedAt: item.updatedAt,
  }));

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Stock de productos</h2>
        <Button>Agregar Remito</Button>
      </div>
      <div>
        <StockClient data={stockFormat} />
      </div>
    </div>
  );
};

export default StockPage;
