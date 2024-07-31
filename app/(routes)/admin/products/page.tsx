"use client";

import React, { useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import ProductsClient from "./components/client";
import { ProductsColumn } from "./components/columns";
import useProductStore from "@/hooks/use-products-store";

const ProductsPage = () => {
  // const products = await db.product.findMany();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const productsFormat: ProductsColumn[] = products.map((item) => ({
    id: item.id || "",
    title: item.title,
    type: item.type,
    year: item.year,
    price: item.price,
    stock: item.stock,
    boxSize: item.boxSize,
    available: item.available,
    discount: item.discount,
    size: item.size,
    category: item.category,
    description: item.description,
    src: item.src,
    updatedAt: format(new Date(item.updatedAt), "dd/MM/yy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-neutral-800">Productos</h1>
        <div>
          <Link href={"/admin/products/new"}>
            <Button
              className="bg-blue-500 flex gap-x-2 items-center rounded-sm"
              size="sm"
            >
              <Plus size={20} />
              Agregar Producto
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <ProductsClient data={productsFormat} />
      </div>
    </div>
  );
};

export default ProductsPage;
