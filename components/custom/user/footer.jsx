import Image from "next/image";
import Logo from "@/public/assets/icons/logo.png";
import Link from "next/link";
import {
  USER_SHOP,
  USER_HOME,
  USER_ABOUT,
  USER_CONTACT,
} from "@/routes/UserRoute";
import { IoLocation } from "react-icons/io5";
import { IoIosMailUnread } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="lg:px-32 px-4 lg:py-8 py-4 grid lg:grid-cols-5 grid-cols-1 gap-8">
        <div className="col-span-1">
          <Image
            className="w-16"
            src={Logo.src}
            alt="logo"
            width={100}
            height={100}
          />
          <p className="text-sm text-gray-500">
            Discover timeless styles and modern trends crafted with care to
            bring comfort, elegance, and confidence to your everyday look – only
            at Hattah
          </p>
        </div>
        <div className="col-span-1">
          <h2 className="uppercase text-xl font-bold">Categories</h2>
          <ul>
            <li>
              <Link
                className="text-gray-500 hover:text-primary hover:font-semibold"
                href={`${USER_SHOP}?category=shirt`}
              >
                Shirt
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 hover:text-primary hover:font-semibold"
                href={`${USER_SHOP}?category=trousers`}
              >
                Trousers
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h2 className="uppercase text-xl font-bold">Others</h2>
          <ul>
            <li>
              <Link
                className="text-gray-500 hover:text-primary hover:font-semibold"
                href={USER_HOME}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 hover:text-primary hover:font-semibold"
                href={USER_ABOUT}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 hover:text-primary hover:font-semibold"
                href={USER_SHOP}
              >
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h2 className="uppercase text-xl font-bold">Services</h2>
          <ul>
            <li>
              <Link
                className="text-gray-500 hover:text-primary hover:font-semibold"
                href={USER_CONTACT}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 hover:text-primary hover:font-semibold"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 hover:text-primary hover:font-semibold"
                href="/terms-and-conditions"
              >
                Terms, & Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h2 className="uppercase text-xl font-bold">Contacts</h2>
          <ul>
            <li className="flex items-center gap-2">
              <IoLocation className="text-primary shrink-0" size={25} />
              <p className="text-sm text-gray-500">
                Hattah, Headquater - 1, Tata-Hata Main Road, Bistupur,
                Jamshedpur, Jharkhand, India, Pin - 831001
              </p>
            </li>
            <li className="flex items-center gap-2">
              <IoIosMailUnread className="text-primary shrink-0" size={25} />
              <Link
                className="text-sm text-gray-500 hover:text-primary"
                href="mailto:arshsengar.work@gmail.com"
              >
                arshsengar.work@gmail.com
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneVolume className="text-primary shrink-0" size={25} />
              <Link
                className="text-sm text-gray-500 hover:text-primary"
                href="tel:+91-706-186-7938"
              >
                +91-706-186-7938
              </Link>
            </li>
          </ul>
          <div className="my-2 flex gap-2">
            <Link href="">
              <FaFacebook className="text-primary" size={25} />
            </Link>
            <Link href="">
              <FaInstagram className="text-primary" size={25} />
            </Link>
            <Link href="">
              <FaThreads className="text-primary" size={25} />
            </Link>
            <Link href="">
              <FaXTwitter className="text-primary" size={25} />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t py-4">
        <p className="text-center">
          © 2025 Hattah, Inc., and any associated logos are trademarks, service
          marks, and/or registered trademarks of Hattah, Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
