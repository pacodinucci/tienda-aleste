"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type ProductsColumn = {
  id: string;
  title: string;
  type: string;
  category: string;
  src: string;
  updatedAt: string;
};

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "src",
    header: "Imagen",
    cell: ({ row }) => (
      <div>
        <Image
          src={row.original.src}
          alt="Imagen vino Al Este"
          width={50}
          height={50}
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "type",
    header: "Variedad",
  },
  {
    accessorKey: "category",
    header: "Tipo",
  },
  {
    accessorKey: "updatedAt",
    header: "Última Actualización",
  },
];
