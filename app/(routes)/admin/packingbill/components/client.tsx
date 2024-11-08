import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, PackingbillColumn } from "./columns";

interface PackingbillClientProps {
  data: PackingbillColumn[];
}

const PackingbillClient: React.FC<PackingbillClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
};

export default PackingbillClient;
