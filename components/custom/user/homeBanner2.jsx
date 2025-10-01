import Image from "next/image";
import Banner3 from "@/public/assets/images/banner_3.jpg";

const HomeBanner2 = () => {
  return (
    <div className="py-2">
      <Image
        src={Banner3.src}
        alt="banner 3"
        width={Banner3.width}
        height={Banner3.height}
      />
    </div>
  );
};

export default HomeBanner2;
