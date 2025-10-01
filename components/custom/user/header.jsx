"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import {
  USER_HOME,
  USER_ABOUT,
  USER_SHOP,
  USER_CONTACT,
  USER_LOGIN,
  USER_DASHBOARD,
} from "@/routes/UserRoute";
import Image from "next/image";
import Logo from "@/public/assets/icons/logo.png";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import Cart from "./cart";
import { FaRegUser } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import User from "@/public/assets/icons/user.png";
import { FaBars } from "react-icons/fa6";
import Search from "./search";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const auth = useSelector((store) => store.authStore.auth);
  return (
    <div className="border-b lg:px-32 px-4">
      <div className="flex justify-between items-center lg:py-4 py-2">
        <Link href={USER_HOME}>
          <Image
            className="w-16"
            src={Logo.src}
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="flex justify-between items-center gap-16">
          <nav
            className={`fixed top-0 ${
              isMobile ? "left-0" : "-left-full"
            } z-2 w-full h-screen bg-white transition-all lg:relative lg:left-0 lg:top-0 lg:p-0 lg:w-auto lg:h-auto`}
          >
            <div className="lg:hidden border-b px-4 py-2 flex justify-between items-center">
              <Image
                className="w-16"
                src={Logo.src}
                alt="logo"
                width={100}
                height={100}
              />
              <button type="button">
                <RxCross2
                  className="text-gray-500 cursor-pointer hover:text-primary"
                  size={25}
                  onClick={() => setIsMobile(false)}
                />
              </button>
            </div>
            <ul className="px-2 lg:flex justify-between items-center gap-8">
              <li className="block py-2">
                <Link
                  className="text-gray-500 hover:text-primary hover:font-semibold"
                  href={USER_HOME}
                >
                  Home
                </Link>
              </li>
              <li className="block py-2">
                <Link
                  className="text-gray-500 hover:text-primary hover:font-semibold"
                  href={USER_ABOUT}
                >
                  About
                </Link>
              </li>
              <li className="block py-2">
                <Link
                  className="text-gray-500 hover:text-primary hover:font-semibold"
                  href={USER_SHOP}
                >
                  Shop
                </Link>
              </li>
              <li className="block py-2">
                <Link
                  className="text-gray-500 hover:text-primary hover:font-semibold"
                  href={USER_CONTACT}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex justify-between items-center gap-4">
            <button type="button">
              <FaSearch
                className="text-gray-500 cursor-pointer hover:text-primary"
                size={25}
                onClick={() => setIsVisible(!isVisible)}
              />
            </button>
            <Cart />
            {!auth ? (
              <Link href={USER_LOGIN}>
                <FaRegUser
                  className="text-gray-500 cursor-pointer hover:text-primary"
                  size={25}
                />
              </Link>
            ) : (
              <Link href={USER_DASHBOARD}>
                <Avatar>
                  <AvatarImage src={auth?.avatar?.url || User.src} />
                </Avatar>
              </Link>
            )}
            <button
              className="lg:hidden block"
              type="button"
              onClick={() => setIsMobile(true)}
            >
              <FaBars
                className="text-gray-500 cursor-pointer hover:text-primary"
                size={25}
              />
            </button>
          </div>
        </div>
      </div>
      <Search isVisible={isVisible} />
    </div>
  );
};

export default Header;
