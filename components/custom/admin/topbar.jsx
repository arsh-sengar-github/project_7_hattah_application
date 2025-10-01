"use client";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import Logo from "@/public/assets/icons/logo.png";
import Search from "./search";
import SearchMobile from "./searchMobile";
import SwitchMode from "./switchMode";
import UserOptions from "./userOptions";
import { Button } from "@/components/ui/button";
import { RiMenu4Fill } from "react-icons/ri";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="fixed left-0 top-0 z-1 border-b pr-4 w-full h-16 flex justify-between items-center dark:bg-card md:pl-68 px-4">
      <div className="flex items-center md:hidden">
        <Image src={Logo.src} alt="logo" width={75} height={75} />
      </div>
      <div className="md:block hidden">
        <Search />
      </div>
      <div className="flex items-center gap-1">
        <SearchMobile />
        <SwitchMode />
        <UserOptions />
        <Button
          className="md:hidden"
          size="icon"
          type="button"
          onClick={toggleSidebar}
        >
          <RiMenu4Fill />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
