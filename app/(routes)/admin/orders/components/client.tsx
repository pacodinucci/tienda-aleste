import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, OrdersColumn } from "./columns";

interface OrdersClientProps {
  data: OrdersColumn[];
}

const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
};

export default OrdersClient;
