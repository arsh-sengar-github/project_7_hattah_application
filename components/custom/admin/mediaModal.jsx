import axios from "axios";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import React, { useState } from "react";
import { toastify } from "@/lib/toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Loading from "@/public/assets/icons/loading.svg";
import { Button } from "@/components/ui/button";
import MediaModalMedia from "./mediaModalMedia";
import ButtonLoading from "../buttonLoading";

const MediaModal = ({
  open,
  setOpen,
  selectedMedia,
  setSelectedMedia,
  isMultiple,
}) => {
  const fetchMedia = async (page) => {
    const { data: response } = await axios.get(
      `/api/media?page=${page}&&limit=20&&deleteType=SD`
    );
    return response;
  };
  const {
    isPending,
    isError,
    error,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["media-modal"],
    queryFn: async ({ pageParam }) => await fetchMedia(pageParam),
    placeholderData: keepPreviousData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length;
      return lastPage.hasMore ? nextPage : undefined;
    },
  });
  const [previouslySelectedMedia, setPreviouslySelectedMedia] = useState([]);
  const onClear = () => {
    setPreviouslySelectedMedia([]), setSelectedMedia([]);
    toastify("success", "Cleared");
  };
  const onClose = () => {
    setSelectedMedia(previouslySelectedMedia);
    setOpen(false);
  };
  const onSave = () => {
    if (selectedMedia.length <= 0) {
      toastify("error", "Select, at least, one media");
    }
    setPreviouslySelectedMedia(selectedMedia);
    setOpen(false);
    toastify("success", "Saved");
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent
        className="sm:max-w-[80%] h-screen shadow-none border-0  px-0 py-10 bg-transparent"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogDescription className="hidden"></DialogDescription>
        <div className="h-[80vh] shadow rounded p-2 dark:bg-card">
          <DialogHeader className="h-8 border-b">
            <DialogTitle>Select Media</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto h-[calc(100%-64px)]">
            {isPending ? (
              <div className="size-full flex justify-center items-center">
                <Image src={Loading} alt="loading" width={50} height={50} />
              </div>
            ) : isError ? (
              <div className="size-full flex justify-center items-center">
                <span className="text-sm text-red-500">{error.message}</span>
              </div>
            ) : (
              <div>
                <div className="grid lg:grid-cols-5 grid-cols-4 sm:grid-cols-2 gap-2">
                  {data?.pages?.map((page, index) => (
                    <React.Fragment key={index}>
                      {page?.mediaData?.map((media) => (
                        <MediaModalMedia
                          key={media._id}
                          media={media}
                          selectedMedia={selectedMedia}
                          setSelectedMedia={setSelectedMedia}
                          isMultiple={isMultiple}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </div>
                {hasNextPage && (
                  <div className="py-2 flex justify-center">
                    <ButtonLoading
                      text="Discover More"
                      loading={isFetching}
                      type="button"
                      onClick={() => fetchNextPage()}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="h-8 border-t flex justify-between">
            <div>
              <Button
                className="cursor-pointer"
                variant="destructive"
                type="button"
                onClick={onClear}
              >
                Clear
              </Button>
            </div>
            <div className="flex gap-1">
              <Button
                className="cursor-pointer"
                variant="secondary"
                type="button"
                onClick={onClose}
              >
                Close
              </Button>
              <Button className="cursor-pointer" type="button" onClick={onSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;
