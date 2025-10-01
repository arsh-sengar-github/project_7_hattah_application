import Image from "next/image";
import Link from "next/link";
import Banner1 from "@/public/assets/images/banner_1.jpg";
import Banner2 from "@/public/assets/images/banner_2.jpg";

const HomeBanner1 = () => {
  return (
    <div className="lg:px-32 px-4 py-2">
      <div className="grid grid-cols-2 sm:gap-8 gap-2">
        <div className="overflow-hidden border rounded-lg">
          <Link href="">
            <Image
              className="w-full h-[125px] object-cover transition-all hover:scale-125"
              src={Banner1.src}
              alt="banner 1"
              width={Banner1.width}
              height={Banner1.height}
            />
          </Link>
        </div>
        <div className="overflow-hidden border rounded-lg">
          <Link href="">
            <Image
              className="w-full h-[125px] object-cover transition-all hover:scale-125"
              src={Banner2.src}
              alt="banner 2"
              width={Banner2.width}
              height={Banner2.height}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner1;
