"use client";

import { ColumnDef } from "@tanstack/react-table";

export type PackingbillColumn = {
  id: string;
  packingbillNumber: string;
};

export const columns: ColumnDef<PackingbillColumn>[] = [
  {
    accessorKey: "packingbillNumber",
    header: "Número de remito",
  },
];
