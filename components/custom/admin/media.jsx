import { toastify } from "@/lib/toastify";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { ADMIN_MEDIA_EDIT } from "@/routes/AdminRoute";
import { IoIosLink } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import Image from "next/image";

const Media = ({
  media,
  selectedMedia,
  setSelectedMedia,
  deleteType,
  onDelete,
}) => {
  const onCheck = () => {
    let newlySelectedMedia = [];
    if (selectedMedia.includes(media._id)) {
      newlySelectedMedia = selectedMedia.filter((id) => id !== media._id);
    } else {
      newlySelectedMedia = [...selectedMedia, media._id];
    }
    setSelectedMedia(newlySelectedMedia);
  };
  const onCopyLink = async (url) => {
    await navigator.clipboard.writeText(url);
    toastify("success", "Copied link, to your clipboard");
  };
  return (
    <div className="overflow-hidden border rounded border-gray-200 relative group cursor-pointer">
      <div className="absolute left-2 top-2 z-2">
        <Checkbox
          className="border-primary cursor-pointer"
          checked={selectedMedia.includes(media._id)}
          onCheckedChange={onCheck}
        />
      </div>
      <div className="absolute right-2 top-2 z-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="rounded-full w-4 h-4 flex justify-center items-center bg-orange-500/25 cursor-pointer">
              <BsThreeDotsVertical color="white" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {deleteType === "SD" && (
              <div>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onCopyLink(media.secure_url)}
                >
                  <div className="flex items-center gap-2">
                    <IoIosLink color="orange" />
                    Copy Link
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link
                    className="flex items-center gap-1"
                    href={ADMIN_MEDIA_EDIT(media._id)}
                  >
                    <CiEdit color="orange" />
                    Edit
                  </Link>
                </DropdownMenuItem>
              </div>
            )}
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onDelete([media._id], deleteType)}
              asChild
            >
              <div className="flex items-center gap-1">
                <CiTrash color="red" />
                {deleteType === "SD" ? "Move to Trash" : "Delete"}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full h-full absolute z-1 transition-all duration-200 ease-in-out group-hover:bg-black/25"></div>
      <div>
        <Image
          className="w-full object-cover sm:h-[200px] h-[100px]"
          src={media?.secure_url}
          alt={media?.alt || "image"}
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default Media;
