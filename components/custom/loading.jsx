import Image from "next/image";
import Buffer from "@/public/assets/icons/loading.svg";

const Loading = () => {
  return (
    <div>
      <Image
        className="w-screen h-screen flex justify-center items-start"
        src={Buffer.src}
        alt="loading"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Loading;
