import { Button } from "@/components/ui/button";
import { FaFilter } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productSortings, priceSortings } from "@/lib/utils";

const Sort = ({
  limit,
  setLimit,
  sorting,
  setSorting,
  openMobileFilter,
  setOpenMobileFilter,
}) => {
  return (
    <div className="p-4 flex flex-wrap justify-between items-center gap-2">
      <Button
        className="lg:hidden"
        variant="outline"
        type="button"
        onClick={() => setOpenMobileFilter(!openMobileFilter)}
      >
        <FaFilter />
        Filter
      </Button>
      <ul className="flex items-center gap-2">
        <li className="uppercase font-bold">Show</li>
        {[12, 18, 24, 30].map((currLimit) => (
          <li key={currLimit}>
            <button
              className={`border rounded-full w-8 h-8 flex justify-center items-center text-sm ${
                currLimit === limit ? "bg-primary text-white" : "text-gray-500"
              } cursor-pointer`}
              type="button"
              onClick={() => setLimit(currLimit)}
            >
              {currLimit}
            </button>
          </li>
        ))}
      </ul>
      <Select value={sorting} onValueChange={(value) => setSorting(value)}>
        <SelectTrigger className="cursor-pointer">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Products</SelectLabel>
            {productSortings.map((currSorting) => (
              <SelectItem key={currSorting.value} value={currSorting.value}>
                {currSorting.label}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Prices</SelectLabel>
            {priceSortings.map((currSorting) => (
              <SelectItem key={currSorting.value} value={currSorting.value}>
                {currSorting.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
