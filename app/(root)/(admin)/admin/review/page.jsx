"use client";
import { ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/AdminRoute";
import { useMemo, useCallback } from "react";
import { columnConfig } from "@/lib/helpers";
import { REVIEW_TABLE_COLUMN } from "@/lib/column";
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
    label: "Review",
    href: "",
  },
];
const ReviewPage = () => {
  const columns = useMemo(() => {
    return columnConfig(REVIEW_TABLE_COLUMN);
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
            <h2 className="uppercase text-xl font-semibold">Review</h2>
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <TableWrapper
            queryKey="review-data"
            fetchURL="/api/review"
            exportEndpoint="/api/review/export"
            deleteType="SD"
            deleteEndpoint="/api/review/delete"
            trashView={`${ADMIN_TRASH}?trashof=review`}
            columnsConfig={columns}
            actions={action}
            initialPageSize={20}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPage;
