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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ImagePlaceholder from "@/public/assets/images/image-placeholder.webp";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

const DashboardReviewTable = () => {
  const { data: currReviewsData, loading } = useFetch(
    "/api/dashboard/admin/reviews"
  );
  const [reviews, setReviews] = useState();
  useEffect(() => {
    if (currReviewsData && currReviewsData.success) {
      setReviews(currReviewsData.data);
    }
  }, [currReviewsData]);
  if (loading) {
    return (
      <div className="size-full flex justify-center items-center dark:bg-card">
        <Image src={Loading} alt="loading" width={50} height={50} />
      </div>
    );
  }
  if (!reviews || reviews.length === 0) {
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
          <TableHead>Product</TableHead>
          <TableHead>Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews?.map((review) => (
          <TableRow key={review._id}>
            <TableCell className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={
                    review.product?.media[0]?.secure_url || ImagePlaceholder.src
                  }
                />
              </Avatar>
              <span className="line-clamp-1">
                {review.product?.fullName || "Product"}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                {Array.from({ length: review.rating }).map((_, star) => (
                  <span key={star}>
                    <FaStar className="text-yellow-500" />
                  </span>
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, star) => (
                  <span key={star}>
                    <CiStar className="text-yellow-500" />
                  </span>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardReviewTable;
