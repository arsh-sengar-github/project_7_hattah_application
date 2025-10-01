"use client";
import { ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/AdminRoute";
import { useMemo, useCallback } from "react";
import { columnConfig } from "@/lib/helpers";
import { CUSTOMERS_TABLE_COLUMN } from "@/lib/column";
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
    label: "Customers",
    href: "",
  },
];
const CustomersPage = () => {
  const columns = useMemo(() => {
    return columnConfig(CUSTOMERS_TABLE_COLUMN);
  }, []);
  const action = useCallback((row, deleteType, onDelete) => {
    let actionMenu = [];
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
            <h2 className="uppercase text-xl font-semibold">Customers</h2>
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <TableWrapper
            queryKey="customers-data"
            fetchURL="/api/customers"
            exportEndpoint="/api/customers/export"
            deleteType="SD"
            deleteEndpoint="/api/customers/delete"
            trashView={`${ADMIN_TRASH}?trashof=customers`}
            columnsConfig={columns}
            actions={action}
            initialPageSize={20}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
