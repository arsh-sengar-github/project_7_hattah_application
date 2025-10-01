"use client";
import {
  ADMIN_DASHBOARD,
  ADMIN_ORDERS_VIEW,
  ADMIN_TRASH,
} from "@/routes/AdminRoute";
import { useMemo, useCallback } from "react";
import { columnConfig } from "@/lib/helpers";
import { ORDERS_TABLE_COLUMN } from "@/lib/column";
import ActionView from "@/components/custom/admin/actionView";
import ActionDelete from "@/components/custom/admin/actionDelete";
import BreadCrumb from "@/components/custom/admin/breadCrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import TableWrapper from "@/components/custom/admin/tableWrapper";

const breadCrumbData = [
  {
    label: "Dashboard",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Orders",
    href: "",
  },
];
const OrdersPage = () => {
  const columns = useMemo(() => {
    return columnConfig(ORDERS_TABLE_COLUMN);
  }, []);
  const action = useCallback((row, deleteType, onDelete) => {
    let actionMenu = [];
    actionMenu.push(
      <ActionView key="view" href={ADMIN_ORDERS_VIEW(row.original.order_id)} />
    );
    actionMenu.push(
      <ActionDelete
        key="delete"
        row={row}
        deleteType={deleteType}
        onDelete={onDelete}
      />
    );
    return actionMenu;
  }, []);
  return (
    <div>
      <BreadCrumb breadCrumbData={breadCrumbData} />
      <Card className="shadow-sm rounded p-0">
        <CardHeader className="border-b px-6 py-2 !pb-1">
          <div className="flex justify-between items-center">
            <h2 className="uppercase text-xl font-semibold">Orders</h2>
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <TableWrapper
            queryKey="orders-data"
            fetchURL="/api/orders"
            exportEndpoint="/api/orders/export"
            deleteType="SD"
            deleteEndpoint="/api/orders/delete"
            trashView={`${ADMIN_TRASH}?trashof=orders`}
            columnsConfig={columns}
            actions={action}
            initialPageSize={20}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
