import { PiSealPercentFill } from "react-icons/pi";
import { FaTruckFast } from "react-icons/fa6";
import { FaTruckRampBox } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const HomeServices = () => {
  return (
    <div className="border-t lg:px-32 px-4 lg:py-8 py-4">
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2">
        <div className="text-center">
          <div className="mb-4 flex justify-center items-center">
            <PiSealPercentFill className="text-primary" size={50} />
          </div>
          <h3 className="text-xl font-bold">Exclusive Discounts</h3>
          <p className="text-gray-500">
            Save more, every time you shop with our unbeatable offers.
          </p>
        </div>
        <div className="text-center">
          <div className="mb-4 flex justify-center items-center">
            <FaTruckFast className="text-primary" size={50} />
          </div>
          <h3 className="text-xl font-bold">Fast, & Reliable Shipping</h3>
          <p className="text-gray-500">
            Get your favorites delivered to your doorstep, right on time.
          </p>
        </div>
        <div className="text-center">
          <div className="mb-4 flex justify-center items-center">
            <FaTruckRampBox className="text-primary" size={50} />
          </div>
          <h3 className="text-xl font-bold">Hassel-Free Returns</h3>
          <p className="text-gray-500">
            Shop with confidence—easy returns for your peace of mind.
          </p>
        </div>
        <div className="text-center">
          <div className="mb-4 flex justify-center items-center">
            <TfiHeadphoneAlt className="text-primary" size={50} />
          </div>
          <h3 className="text-xl font-bold">24/7 Customer Support</h3>
          <p className="text-gray-500">
            We're always here to help, whenever you need us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeServices;
