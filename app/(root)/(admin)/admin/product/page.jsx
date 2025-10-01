"use client";
import {
  ADMIN_DASHBOARD,
  ADMIN_PRODUCT,
  ADMIN_PRODUCT_EDIT,
  ADMIN_PRODUCT_ADD,
  ADMIN_TRASH,
} from "@/routes/AdminRoute";
import { useMemo, useCallback } from "react";
import { columnConfig } from "@/lib/helpers";
import { PRODUCT_TABLE_COLUMN } from "@/lib/column";
import ActionEdit from "@/components/custom/admin/actionEdit";
import ActionDelete from "@/components/custom/admin/actionDelete";
import BreadCrumb from "@/components/custom/admin/breadCrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import TableWrapper from "@/components/custom/admin/tableWrapper";

const breadCrumbData = [
  {
    label: "Dashboard",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Product",
    href: ADMIN_PRODUCT,
  },
];
const ProductPage = () => {
  const columns = useMemo(() => {
    return columnConfig(PRODUCT_TABLE_COLUMN);
  }, []);
  const action = useCallback((row, deleteType, onDelete) => {
    let actionMenu = [];
    actionMenu.push(
      <ActionEdit key="edit" href={ADMIN_PRODUCT_EDIT(row.original._id)} />
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
            <h2 className="uppercase text-xl font-semibold">Product</h2>
            <Button type="button">
              <Link
                className="flex justify-center items-center gap-1"
                href={ADMIN_PRODUCT_ADD}
              >
                <FiPlus />
                Add Product
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <TableWrapper
            queryKey="product-data"
            fetchURL="/api/product"
            exportEndpoint="/api/product/export"
            deleteType="SD"
            deleteEndpoint="/api/product/delete"
            trashView={`${ADMIN_TRASH}?trashof=product`}
            columnsConfig={columns}
            actions={action}
            initialPageSize={20}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;
