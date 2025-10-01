import DashboardCount from "@/components/custom/admin/dashboardCount";
import DashboardAdd from "@/components/custom/admin/dashboardAdd";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ADMIN_ORDERS, ADMIN_REVIEW } from "@/routes/AdminRoute";
import { DashboardOrderStatistics } from "@/components/custom/admin/dashboardOrderStatistics";
import { DashboardOrderStatuses } from "@/components/custom/admin/dashboardOrderStatuses";
import DashboardOrderTable from "@/components/custom/admin/dashboardOrderTable";
import DashboardReviewTable from "@/components/custom/admin/dashboardReviewTable";

const DashboardPage = () => {
  return (
    <div className="py-4">
      <DashboardCount />
      <DashboardAdd />
      <div className="my-2 flex lg:flex-nowrap flex-wrap gap-8">
        <Card className="rounded-lg p-0 lg:w-[70%] w-full">
          <CardHeader className="border-b px-2 py-2 !pb-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Order Statistics</span>
              <Button type="button">
                <Link href={ADMIN_ORDERS}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DashboardOrderStatistics />
          </CardContent>
        </Card>
        <Card className="rounded-lg p-0 lg:w-[30%] w-full">
          <CardHeader className="border-b px-2 py-2 !pb-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Order Statuses</span>
              <Button type="button">
                <Link href={ADMIN_ORDERS}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DashboardOrderStatuses />
          </CardContent>
        </Card>
      </div>
      <div className="my-2 flex lg:flex-nowrap flex-wrap gap-8">
        <Card className="block rounded-lg p-0 lg:w-[70%] w-full">
          <CardHeader className="border-b px-2 py-2 !pb-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Orders</span>
              <Button type="button">
                <Link href={ADMIN_ORDERS}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 lg:h-[400px] overflow-auto">
            <DashboardOrderTable />
          </CardContent>
        </Card>
        <Card className="block rounded-lg p-0 lg:w-[30%] w-full">
          <CardHeader className="border-b px-2 py-2 !pb-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Reviews</span>
              <Button type="button">
                <Link href={ADMIN_REVIEW}>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 lg:h-[400px] overflow-auto">
            <DashboardReviewTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
