"use client";
import {
  ADMIN_DASHBOARD,
  ADMIN_CATEGORY,
  ADMIN_CATEGORY_EDIT,
  ADMIN_CATEGORY_ADD,
  ADMIN_TRASH,
} from "@/routes/AdminRoute";
import { useMemo, useCallback } from "react";
import { columnConfig } from "@/lib/helpers";
import { CATEGORY_TABLE_COLUMN } from "@/lib/column";
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
    label: "Category",
    href: ADMIN_CATEGORY,
  },
];
const CategoryPage = () => {
  const columns = useMemo(() => {
    return columnConfig(CATEGORY_TABLE_COLUMN);
  }, []);
  const action = useCallback((row, deleteType, onDelete) => {
    let actionMenu = [];
    actionMenu.push(
      <ActionEdit key="edit" href={ADMIN_CATEGORY_EDIT(row.original._id)} />
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
            <h2 className="uppercase text-xl font-semibold">Category</h2>
            <Button type="button">
              <Link
                className="flex justify-center items-center gap-1"
                href={ADMIN_CATEGORY_ADD}
              >
                <FiPlus />
                Add Category
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <TableWrapper
            queryKey="category-data"
            fetchURL="/api/category"
            exportEndpoint="/api/category/export"
            deleteType="SD"
            deleteEndpoint="/api/category/delete"
            trashView={`${ADMIN_TRASH}?trashof=category`}
            columnsConfig={columns}
            actions={action}
            initialPageSize={20}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryPage;
