"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { customerReviews } from "@/lib/userCustomerReviews";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

const HomeCustomerReviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="lg:px-32 px-4 py-2">
      <h2 className="text-center sm:text-4xl text-2xl sm:font-bold font-semibold">
        Satisfied Customers
      </h2>
      <Slider {...settings}>
        {customerReviews.map((customerReview, index) => (
          <div className="p-4" key={index}>
            <div className="border rounded-lg p-8 lg:h-[400px] h-[200px]">
              <FaRegCommentDots className="mb-4 text-primary" size={25} />
              <div className="my-2 flex items-center">
                {Array.from({ length: customerReview.rating }).map(
                  (_, star) => (
                    <FaStar className="text-yellow-500" size={25} key={star} />
                  )
                )}
                {Array.from({ length: 5 - customerReview.rating }).map(
                  (_, star) => (
                    <CiStar className="text-yellow-500" size={25} key={star} />
                  )
                )}
              </div>
              <p className="text-sm text-gray-500">{customerReview.review}</p>
              <h3 className="font-semibold">— {customerReview.fullName}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeCustomerReviews;
