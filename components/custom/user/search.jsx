"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { USER_SHOP } from "@/routes/UserRoute";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

const Search = ({ isVisible }) => {
  const router = useRouter();
  const [query, setQuery] = useState();
  const onSearch = () => {
    router.push(`${USER_SHOP}?search=${query}`);
  };
  return (
    <div
      className={`absolute left-0 ${
        isVisible ? "top-16" : "-top-full "
      } z-1 border-t py-4 w-full bg-white transition-all md:px-32 px-4`}
    >
      <div className="relative flex justify-between items-center">
        <Input
          className="border-primary rounded-full py-4 md:h-8"
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className="absolute right-4 cursor-pointer"
          type="button"
          onClick={onSearch}
        >
          <FaSearch
            className="text-gray-500 cursor-pointer hover:text-primary"
            size={25}
          />
        </button>
      </div>
    </div>
  );
};

export default Search;
