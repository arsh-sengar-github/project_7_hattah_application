"use client";
import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "@/public/assets/icons/loading.svg";
import NotFound from "@/public/assets/icons/not-found.gif";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dashboardOrderStatus } from "@/lib/helpers";

const DashboardOrderTable = () => {
  const { data: currOrdersData, loading } = useFetch(
    "/api/dashboard/admin/orders"
  );
  const [orders, setOrders] = useState();
  useEffect(() => {
    if (currOrdersData && currOrdersData.success) {
      setOrders(currOrdersData.data);
    }
  }, [currOrdersData]);
  if (loading) {
    return (
      <div className="size-full flex justify-center items-center dark:bg-card">
        <Image src={Loading} alt="loading" width={50} height={50} />
      </div>
    );
  }
  if (!orders || orders.length === 0) {
    return (
      <div className="size-full flex justify-center items-center dark:bg-card">
        <Image src={NotFound} alt="not-found" width={50} height={50} />
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Payment-ID</TableHead>
          <TableHead>Order-ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order._id}>
            <TableCell>{order.payment_id}</TableCell>
            <TableCell>{order._id}</TableCell>
            <TableCell>{dashboardOrderStatus(order.status)}</TableCell>
            <TableCell>{order.products?.length}</TableCell>
            <TableCell>{order.payable}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardOrderTable;
