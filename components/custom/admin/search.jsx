import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import SearchModal from "./searchModal";

const Search = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:w-[400px]">
      <div className="relative flex justify-between items-center">
        <Input
          className="rounded-full cursor-pointer"
          placeholder="Search..."
          readOnly
          onClick={() => setOpen(true)}
        />
        <button className="absolute right-4 cursor-pointer" type="button">
          <IoSearchOutline />
        </button>
      </div>
      <SearchModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Search;
