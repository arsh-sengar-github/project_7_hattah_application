import Image from "next/image";
import User from "@/public/assets/icons/user.png";
import { FaStar } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const Review = ({ review }) => {
  return (
    <div className="p-2 flex gap-4">
      <div className="w-[50px]">
        <Image
          className="rounded-full"
          src={review?.avatar?.url || User.src}
          alt="user"
          width={50}
          height={50}
        />
      </div>
      <div className="w-[calc(100%-100px)]">
        <div>
          <h4 className="flex items-center gap-2">
            <span>{review?.title}</span>—
            <span className="flex items-center">
              <span className="mt-1 text-gray-500">{review?.rating}</span>
              <FaStar className="text-yellow-500" />
            </span>
          </h4>
          <p className="mb-2 flex items-center gap-2">
            <span className="text-gray-500">{review?.reviewedBy}</span>—
            <span className="text-sm text-gray-500">
              {dayjs(review?.createdAt).fromNow()}
            </span>
          </p>
          <p className="text-sm text-gray-500">{review?.review}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
