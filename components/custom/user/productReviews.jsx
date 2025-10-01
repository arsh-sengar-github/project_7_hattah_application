"use client";
import { useSelector } from "react-redux";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { toastify } from "@/lib/toastify";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Rating } from "@mui/material";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/custom/buttonLoading";
import { Textarea } from "@/components/ui/textarea";
import { USER_LOGIN } from "@/routes/UserRoute";
import Review from "./review";
import useFetch from "@/hooks/use-fetch";

const ProductReviews = ({ product }) => {
  const auth = useSelector((store) => store.authStore.auth);
  const formSchema = zSchema.pick({
    user: true,
    product: true,
    title: true,
    rating: true,
    review: true,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: auth?._id,
      product: product,
      title: "",
      rating: 0,
      review: "",
    },
  });
  const [currentURL, setCurrentURL] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href);
    }
  }, []);
  const fetchReview = async (pageParams) => {
    const { data: reviewData } = await axios.get(
      `/api/review/get-public?productID=${product}&page=${pageParams}`
    );
    if (!reviewData.success) {
      return null;
    }
    return reviewData.data;
  };
  const { data, error, hasNextPage, fetchNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["reviews"],
      queryFn: async ({ pageParams }) => await fetchReview(pageParams),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    });
  const { data: reviewDetailsData } = useFetch(
    `/api/review/get-public/details?productID=${product}`
  );
  const [reviewDetails, setReviewDetails] = useState();
  useEffect(() => {
    if (reviewDetailsData && reviewDetailsData.success) {
      const currReviewDetailsData = reviewDetailsData.data;
      setReviewDetails(currReviewDetailsData);
    }
  }, [reviewDetailsData]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const onAddReviewFormSubmit = async (values) => {
    setLoading(true);
    try {
      const { data: response } = await axios.post("/api/review/add", values);
      if (!response.success) {
        throw new Error(response.message);
      }
      form.reset();
      queryClient.invalidateQueries(["reviews"]);
      toastify("success", response.message);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setLoading(false);
      setIsVisible(false);
    }
  };
  return (
    <div className="shadow border rounded">
      <div className="border-b p-2">
        <h2 className="text-xl font-semibold">Reviews</h2>
      </div>
      <div>
        <div className="border-b p-2 flex flex-wrap justify-between items-center">
          <div className="md:mb-0 mb-2 md:w-1/2 w-full md:flex md:gap-8">
            <div className="md:mb-0 mb-2 md:w-[200px] w-full flex flex-col items-center">
              <h3 className="text-8xl text-center font-bold">
                {reviewDetails?.averageRating}
              </h3>
              <div className="flex items-center">
                {Array.from({
                  length: Math.round(reviewDetails?.averageRating),
                }).map((_, star) => (
                  <span key={star}>
                    <FaStar className="text-yellow-500" />
                  </span>
                ))}
                {Array.from({
                  length: 5 - Math.round(reviewDetails?.averageRating),
                }).map((_, star) => (
                  <span key={star}>
                    <CiStar className="text-yellow-500" />
                  </span>
                ))}
              </div>
              <span className="text-gray-500">
                ({reviewDetails?.reviewCount} reviews)
              </span>
            </div>
            <div className="md:mb-0 mb-2 md:w-[calc(100%-200px)] flex items-center">
              <div className="w-full">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div className="flex items-center gap-2" key={rating}>
                    <span className="w-2">{rating}</span>
                    <FaStar className="text-yellow-500" />
                    <Progress
                      className="flex-1"
                      value={reviewDetails?.individualProgress[rating]}
                    />
                    <span className="text-sm">
                      {reviewDetails?.individualRatingCount[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full md:text-end text-center">
            <Button
              className="px-8 py-4 md:w-fit w-full cursor-pointer"
              variant="outline"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
            >
              {!isVisible ? "Add a Review" : "Cancel Reviewing"}
            </Button>
          </div>
        </div>
        {isVisible && (
          <div>
            {!auth ? (
              <div className="mb-2 border-b">
                <div className="border-b p-2">
                  <h2 className="text-xl font-semibold">Login</h2>
                  <p className="text-sm">
                    Log into your account, first, to add a review.
                  </p>
                </div>
                <div className="p-2">
                  <Button type="button" asChild>
                    <Link href={`${USER_LOGIN}?callback=${currentURL}`}>
                      Login
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mb-2 border-b">
                <div className="border-b p-2">
                  <h2 className="text-xl font-semibold">Write a Review</h2>
                </div>
                <div className="p-2">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onAddReviewFormSubmit)}>
                      <div className="my-2">
                        <FormField
                          control={form.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rating</FormLabel>
                              <FormControl>
                                <Rating
                                  size="large"
                                  name="rating"
                                  value={field.value}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="my-2">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Title"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="my-2">
                        <FormField
                          control={form.control}
                          name="review"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Review</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="This product is..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="my-2 flex justify-center items-center">
                        <ButtonLoading
                          className="cursor-pointer"
                          text="Add"
                          loading={loading}
                          type="submit"
                        />
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            )}
          </div>
        )}
        <div>
          <div className="border-b p-2">
            <h3 className="text-lg font-semibold">
              {data?.pages[0]?.reviewCount || 0} reviews
            </h3>
          </div>
          <div>
            {data &&
              data.pages.map((page) =>
                page.reviews.map((review) => (
                  <div className="mb-1" key={review._id}>
                    <Review review={review} />
                  </div>
                ))
              )}
            {hasNextPage && (
              <div className="flex justify-center items-center">
                <ButtonLoading
                  text="Discover More"
                  loading={isFetching}
                  type="button"
                  onClick={fetchNextPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
