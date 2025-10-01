import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

const MediaModalMedia = ({
  media,
  selectedMedia,
  setSelectedMedia,
  isMultiple,
}) => {
  const onCheck = () => {
    const isSelected = selectedMedia.find(
      (currMedia) => currMedia._id === media._id
    )
      ? true
      : false;
    let newSelectedMedia = [];
    if (isMultiple) {
      if (isSelected) {
        newSelectedMedia = selectedMedia.filter(
          (currMedia) => currMedia._id !== media._id
        );
      } else {
        newSelectedMedia = [
          ...selectedMedia,
          {
            _id: media._id,
            url: media.secure_url,
          },
        ];
      }
      setSelectedMedia(newSelectedMedia);
    } else {
      setSelectedMedia([
        {
          _id: media._id,
          url: media.secure_url,
        },
      ]);
    }
  };
  return (
    <label
      className="overflow-hidden relative border border-gray-200 rounded group"
      htmlFor={media._id}
    >
      <div className="absolute left-2 top-2 z-1">
        <Checkbox
          className="border-primary cursor-pointer"
          id={media._id}
          checked={
            selectedMedia.find((currMedia) => currMedia._id === media._id)
              ? true
              : false
          }
          onCheckedChange={onCheck}
        />
      </div>
      <div className="relative size-full">
        <Image
          className="object-cover md:h-[200px] h-[100px]"
          src={media?.secure_url}
          alt={media?.alt || "image"}
          width={400}
          height={400}
        />
      </div>
    </label>
  );
};

export default MediaModalMedia;
