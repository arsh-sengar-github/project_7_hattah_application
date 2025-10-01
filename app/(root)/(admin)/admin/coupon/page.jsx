"use client";
import {
  ADMIN_DASHBOARD,
  ADMIN_COUPON,
  ADMIN_COUPON_EDIT,
  ADMIN_COUPON_ADD,
  ADMIN_TRASH,
} from "@/routes/AdminRoute";
import { useMemo, useCallback } from "react";
import { columnConfig } from "@/lib/helpers";
import { COUPON_TABLE_COLUMN } from "@/lib/column";
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
    label: "Coupon",
    href: ADMIN_COUPON,
  },
];
const CouponPage = () => {
  const columns = useMemo(() => {
    return columnConfig(COUPON_TABLE_COLUMN);
  }, []);
  const action = useCallback((row, deleteType, onDelete) => {
    let actionMenu = [];
    actionMenu.push(
      <ActionEdit key="edit" href={ADMIN_COUPON_EDIT(row.original._id)} />
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
            <h2 className="uppercase text-xl font-semibold">Coupon</h2>
            <Button type="button">
              <Link
                className="flex justify-center items-center gap-1"
                href={ADMIN_COUPON_ADD}
              >
                <FiPlus />
                Add Coupon
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <TableWrapper
            queryKey="coupon-data"
            fetchURL="/api/coupon"
            exportEndpoint="/api/coupon/export"
            deleteType="SD"
            deleteEndpoint="/api/coupon/delete"
            trashView={`${ADMIN_TRASH}?trashof=coupon`}
            columnsConfig={columns}
            actions={action}
            initialPageSize={20}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CouponPage;
