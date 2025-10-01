"use client";
import { ADMIN_DASHBOARD } from "@/routes/AdminRoute";
import {
  CATEGORY_TABLE_COLUMN,
  PRODUCT_TABLE_COLUMN,
  VARIANT_TABLE_COLUMN,
  COUPON_TABLE_COLUMN,
  ORDERS_TABLE_COLUMN,
  CUSTOMERS_TABLE_COLUMN,
  REVIEW_TABLE_COLUMN,
} from "@/lib/column";
import { useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";
import { columnConfig } from "@/lib/helpers";
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
    label: "Trash",
    href: "",
  },
];
const TRASH_CONFIG = {
  category: {
    title: "Trash",
    fetchURL: "/api/category",
    exportURL: "/api/category/export",
    deleteURL: "/api/category/delete",
    columns: CATEGORY_TABLE_COLUMN,
  },
  product: {
    title: "Trash",
    fetchURL: "/api/product",
    exportURL: "/api/product/export",
    deleteURL: "/api/product/delete",
    columns: PRODUCT_TABLE_COLUMN,
  },
  variant: {
    title: "Trash",
    fetchURL: "/api/variant",
    exportURL: "/api/variant/export",
    deleteURL: "/api/variant/delete",
    columns: VARIANT_TABLE_COLUMN,
  },
  coupon: {
    title: "Trash",
    fetchURL: "/api/coupon",
    exportURL: "/api/coupon/export",
    deleteURL: "/api/coupon/delete",
    columns: COUPON_TABLE_COLUMN,
  },
  orders: {
    title: "Trash",
    fetchURL: "/api/orders",
    exportURL: "/api/orders/export",
    deleteURL: "/api/orders/delete",
    columns: ORDERS_TABLE_COLUMN,
  },
  customers: {
    title: "Trash",
    fetchURL: "/api/customers",
    exportURL: "/api/customers/export",
    deleteURL: "/api/customers/delete",
    columns: CUSTOMERS_TABLE_COLUMN,
  },
  review: {
    title: "Trash",
    fetchURL: "/api/review",
    exportURL: "/api/review/export",
    deleteURL: "/api/review/delete",
    columns: REVIEW_TABLE_COLUMN,
  },
};
const TrashPage = () => {
  const searchParams = useSearchParams();
  const trashOf = searchParams.get("trashof");
  const config = TRASH_CONFIG[trashOf];
  const columns = useMemo(() => {
    return columnConfig(config.columns, false, false, true);
  }, []);
  const action = useCallback((row, deleteType, onDelete) => {
    return [
      <ActionDelete
        key="delete"
        row={row}
        deleteType={deleteType}
        onDelete={onDelete}
      />,
    ];
  }, []);
  return (
    <div>
      <BreadCrumb breadCrumbData={breadCrumbData} />
      <Card className="shadow-sm rounded p-0">
        <CardHeader className="border-b px-6 py-2 !pb-1">
          <div className="flex justify-between items-center">
            <h2 className="uppercase text-xl font-semibold">{config.title}</h2>
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <TableWrapper
            queryKey={`${trashOf}-data-deleted`}
            fetchURL={config.fetchURL}
            exportEndpoint={config.exportURL}
            deleteType="PD"
            deleteEndpoint={config.deleteURL}
            columnsConfig={columns}
            actions={action}
            initialPageSize={20}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrashPage;
