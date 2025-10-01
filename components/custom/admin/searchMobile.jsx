import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoSearchOutline } from "react-icons/io5";
import SearchModal from "./searchModal";

const SearchMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        className="md:hidden"
        size="icon"
        variant="ghost"
        type="button"
        onClick={() => setOpen(true)}
      >
        <IoSearchOutline />
      </Button>
      <SearchModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default SearchMobile;
