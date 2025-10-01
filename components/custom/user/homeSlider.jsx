"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import Slider from "react-slick";
import Image from "next/image";
import Slider1 from "@/public/assets/images/slider_1.jpg";
import Slider2 from "@/public/assets/images/slider_2.jpg";
import Slider3 from "@/public/assets/images/slider_3.jpg";
import Slider4 from "@/public/assets/images/slider_4.jpg";

const PreviousArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute left-8 top-1/2 -translate-y-1/2 z-1 rounded-full p-8 w-8 h-8 flex justify-center items-center bg-white text-gray-500 cursor-pointer hover:text-primary"
      type="button"
      onClick={onClick}
    >
      <FaChevronLeft className="shrink-0" size={25} />
    </button>
  );
};
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute right-8 top-1/2 -translate-y-1/2 z-1 rounded-full p-8 w-8 h-8 flex justify-center items-center bg-white text-gray-500 cursor-pointer hover:text-primary"
      type="button"
      onClick={onClick}
    >
      <FaChevronRight className="shrink-0" size={25} />
    </button>
  );
};
const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrow: true,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          dots: false,
          arrow: false,
          prevArrow: "",
          nextArrow: "",
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <Image
            className="w-full lg:h-[500px] object-cover"
            src={Slider1.src}
            alt="slider 1"
            width={Slider1.width}
            height={Slider1.height}
          />
        </div>
        <div>
          <Image
            className="w-full lg:h-[500px] object-cover"
            src={Slider2.src}
            alt="slider 2"
            width={Slider2.width}
            height={Slider2.height}
          />
        </div>
        <div>
          <Image
            className="w-full lg:h-[500px] object-cover"
            src={Slider3.src}
            alt="slider 3"
            width={Slider3.width}
            height={Slider3.height}
          />
        </div>
        <div>
          <Image
            className="w-full lg:h-[500px] object-cover"
            src={Slider4.src}
            alt="slider 4"
            width={Slider4.width}
            height={Slider4.height}
          />
        </div>
      </Slider>
    </div>
  );
};

export default HomeSlider;
