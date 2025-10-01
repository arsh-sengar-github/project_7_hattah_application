"use client";
import { ADMIN_DASHBOARD, ADMIN_MEDIA } from "@/routes/AdminRoute";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/use-fetch";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useMutationDelete from "@/hooks/use-mutation-delete";
import BreadCrumb from "@/components/custom/admin/breadCrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import UploadMedia from "@/components/custom/admin/uploadMedia";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/public/assets/icons/loading.svg";
import Media from "@/components/custom/admin/media";
import ButtonLoading from "@/components/custom/buttonLoading";

const breadCrumbData = [
  {
    label: "Dashboard",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Media",
    href: "",
  },
];
const MediaPage = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useFetch("/api/media/get/user-id");
  const [userID, setUserID] = useState("");
  useEffect(() => {
    if (userData && userData.success) {
      setUserID(userData.data?._id);
    }
  }, [userData]);
  const fetchMedia = async (page, deleteType) => {
    const { data: response } = await axios.get(
      `/api/media?page=${page}&&limit=20&&deleteType=${deleteType}`
    );
    return response;
  };
  const [selectAllMedia, setSelectAllMedia] = useState(false);
  const onSelectAllMedia = () => {
    setSelectAllMedia(!selectAllMedia);
  };
  const [selectedMedia, setSelectedMedia] = useState([]);
  useEffect(() => {
    if (selectAllMedia) {
      const ids = data.pages.flatMap((page) =>
        page.mediaData.map((media) => media._id)
      );
      setSelectedMedia(ids);
    } else {
      setSelectedMedia([]);
    }
  }, [selectAllMedia]);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams) {
      const trashOf = searchParams.get("trashof");
      setSelectedMedia([]);
      if (trashOf) {
        setDeleteType("PD");
      } else {
        setDeleteType("SD");
      }
    }
  }, [searchParams]);
  const [deleteType, setDeleteType] = useState("SD");
  const { data, error, hasNextPage, fetchNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["media-data", deleteType],
      queryFn: async ({ pageParams }) =>
        await fetchMedia(pageParams, deleteType),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length;
        return lastPage.hasMore ? nextPage : undefined;
      },
    });
  const mutationDelete = useMutationDelete("media-data", "/api/media/delete");
  const onDelete = (ids, deleteType) => {
    let isConfirm = true;
    if (deleteType === "PD") {
      isConfirm = confirm("Do you want to delete the media, permanently?");
    }
    if (isConfirm) {
      mutationDelete.mutate({ ids, deleteType });
    }
    setSelectAllMedia(false);
    setSelectedMedia([]);
  };
  return (
    <div>
      <BreadCrumb breadCrumbData={breadCrumbData} />
      <Card className="shadow-sm rounded p-0">
        <CardHeader className="border-b px-6 py-2 !pb-1">
          <div className="flex justify-between items-center">
            <h2 className="uppercase text-xl font-semibold">
              {deleteType === "SD" ? "Media" : "Trash"}
            </h2>
            <div className="flex items-center gap-1">
              {deleteType === "SD" && userID && (
                <UploadMedia
                  queryClient={queryClient}
                  isMultiple={true}
                  userID={userID}
                />
              )}
              <div className="flex gap-1">
                {deleteType === "SD" ? (
                  <Button
                    className="cursor-pointer"
                    variant="destructive"
                    type="button"
                  >
                    <Link href={`${ADMIN_MEDIA}?trashof=media`}>Trash</Link>
                  </Button>
                ) : (
                  <Button className="cursor-pointer" type="button">
                    <Link href={ADMIN_MEDIA}>Back</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedMedia.length > 0 && (
            <div className="my-2 rounded p-2 flex justify-between items-center bg-orange-100">
              <Label>
                <Checkbox
                  className="border-primary cursor-pointer"
                  checked={selectAllMedia}
                  onCheckedChange={onSelectAllMedia}
                />
                Select All
              </Label>
              <div className="flex gap-1">
                {deleteType === "SD" ? (
                  <Button
                    className="cursor-pointer"
                    variant="destructive"
                    type="button"
                    onClick={() => onDelete(selectedMedia, deleteType)}
                  >
                    Move to Trash
                  </Button>
                ) : (
                  <div>
                    <Button
                      className="bg-green-500 cursor-pointer hover:bg-green-600"
                      type="button"
                      onClick={() => onDelete(selectedMedia, "RSD")}
                    >
                      Restore
                    </Button>
                    <Button
                      className="cursor-pointer"
                      variant="destructive"
                      type="button"
                      onClick={() => onDelete(selectedMedia, deleteType)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
          {status === "pending" ? (
            <div className="size-full flex justify-center items-center">
              <Image src={Loading} alt="loading" width={50} height={50} />
            </div>
          ) : status === "error" ? (
            <div className="py-2 flex justify-center items-center">
              <span className="text-sm text-red-500">{error.message}</span>
            </div>
          ) : (
            <div>
              {!(
                data?.pages?.flatMap((page) =>
                  page?.mediaData?.map((media) => media._id)
                ) ?? []
              ).length && (
                <div className="py-2 flex justify-center items-center">
                  Empty
                </div>
              )}
              <div className="my-4 grid lg:grid-cols-5 grid-cols-4 sm:grid-cols-2 gap-2">
                {data?.pages?.map((page, index) => (
                  <React.Fragment key={index}>
                    {page?.mediaData?.map((media) => (
                      <Media
                        key={media._id}
                        media={media}
                        selectedMedia={selectedMedia}
                        setSelectedMedia={setSelectedMedia}
                        deleteType={deleteType}
                        onDelete={onDelete}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          {hasNextPage && (
            <div className="py-2 flex justify-center items-center">
              <ButtonLoading
                className="cursor-pointer"
                text="Discover More"
                loading={isFetching}
                type="button"
                onClick={() => fetchNextPage()}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaPage;
