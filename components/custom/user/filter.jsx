"use client";
import useFetch from "@/hooks/use-fetch";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { USER_SHOP } from "@/routes/UserRoute";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import ButtonLoading from "../buttonLoading";

const Filter = () => {
  const { data: categoryData } = useFetch("/api/category/get-public");
  const { data: variantColorData } = useFetch("/api/variant/get-public/color");
  const { data: variantSizeData } = useFetch("/api/variant/get-public/size");
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const onCategoryChange = (categorySlug) => {
    let newlySelectedCategories = [...selectedCategories];
    if (newlySelectedCategories.includes(categorySlug)) {
      newlySelectedCategories = newlySelectedCategories.filter(
        (category) => category !== categorySlug
      );
    } else {
      newlySelectedCategories.push(categorySlug);
    }
    setSelectedCategories(newlySelectedCategories);
    if (newlySelectedCategories.length > 0) {
      urlSearchParams.set("category", newlySelectedCategories.join(","));
    } else {
      urlSearchParams.delete("category");
    }
    router.push(`${USER_SHOP}?${urlSearchParams}`);
  };
  const [selectedColors, setSelectedColors] = useState([]);
  const onColorChange = (colorSlug) => {
    let newlySelectedColors = [...selectedColors];
    if (newlySelectedColors.includes(colorSlug)) {
      newlySelectedColors = newlySelectedColors.filter(
        (color) => color !== colorSlug
      );
    } else {
      newlySelectedColors.push(colorSlug);
    }
    setSelectedColors(newlySelectedColors);
    if (newlySelectedColors.length > 0) {
      urlSearchParams.set("color", newlySelectedColors.join(","));
    } else {
      urlSearchParams.delete("color");
    }
    router.push(`${USER_SHOP}?${urlSearchParams}`);
  };
  const [selectedSizes, setSelectedSizes] = useState([]);
  const onSizeChange = (sizeSlug) => {
    let newlySelectedSizes = [...selectedSizes];
    if (newlySelectedSizes.includes(sizeSlug)) {
      newlySelectedSizes = newlySelectedSizes.filter(
        (size) => size !== sizeSlug
      );
    } else {
      newlySelectedSizes.push(sizeSlug);
    }
    setSelectedSizes(newlySelectedSizes);
    if (newlySelectedSizes.length > 0) {
      urlSearchParams.set("size", newlySelectedSizes.join(","));
    } else {
      urlSearchParams.delete("size");
    }
    router.push(`${USER_SHOP}?${urlSearchParams}`);
  };
  const [priceRange, setPriceRange] = useState({
    minimumPrice: 0,
    maximumPrice: 2000,
  });
  const onPriceChange = (value) => {
    setPriceRange({ minimumPrice: value[0], maximumPrice: value[1] });
  };
  const onRangeChange = () => {
    urlSearchParams.set("minimumPrice", priceRange.minimumPrice);
    urlSearchParams.set("maximumPrice", priceRange.maximumPrice);
    if (priceRange.minimumPrice === 0 && priceRange.maximumPrice === 2000) {
      urlSearchParams.delete("minimumPrice");
      urlSearchParams.delete("maximumPrice");
    }
    router.push(`${USER_SHOP}?${urlSearchParams}`);
  };
  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategories(searchParams.get("category").split(","));
    } else {
      setSelectedCategories([]);
    }
    if (searchParams.get("color")) {
      setSelectedColors(searchParams.get("color").split(","));
    } else {
      setSelectedColors([]);
    }
    if (searchParams.get("size")) {
      setSelectedSizes(searchParams.get("size").split(","));
    } else {
      setSelectedSizes([]);
    }
  }, [searchParams]);
  return (
    <div>
      {searchParams.size > 0 && (
        <Button className="w-full" variant="destructive" type="button" asChild>
          <Link href={USER_SHOP}>Clear</Link>
        </Button>
      )}
      <Accordion type="multiple" defaultValue={["1", "2", "3", "4"]}>
        <AccordionItem value="1">
          <AccordionTrigger className="uppercase font-bold hover:no-underline cursor-pointer">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="overflow-auto max-h-64">
              <ul>
                {categoryData &&
                  categoryData.success &&
                  categoryData.data.map((category) => (
                    <li className="my-2" key={category._id}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={selectedCategories.includes(category.slug)}
                          onCheckedChange={() =>
                            onCategoryChange(category.slug)
                          }
                        />
                        <span className="text-gray-500">
                          {category.fullName}
                        </span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger className="uppercase font-bold hover:no-underline cursor-pointer">
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="overflow-auto max-h-64">
              <ul>
                {variantColorData &&
                  variantColorData.success &&
                  variantColorData.data.map((color) => (
                    <li className="my-2" key={color}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => onColorChange(color)}
                        />
                        <span className="text-gray-500">{color}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger className="uppercase font-bold hover:no-underline cursor-pointer">
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="overflow-auto max-h-64">
              <ul>
                {variantSizeData &&
                  variantSizeData.success &&
                  variantSizeData.data.map((size) => (
                    <li className="my-2" key={size}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={() => onSizeChange(size)}
                        />
                        <span className="text-gray-500">{size}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="4">
          <AccordionTrigger className="uppercase font-bold hover:no-underline cursor-pointer">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <Slider
              className="p-4"
              defaultValue={[0, 2000]}
              max={2000}
              step={1}
              onValueChange={onPriceChange}
            />
            <div className="flex justify-between items-center">
              <span className="text-gray-500">
                {priceRange.minimumPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
              <span className="text-gray-500">
                {priceRange.maximumPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
            <div className="my-2">
              <ButtonLoading
                className="rounded-full"
                text="Set Range"
                type="button"
                onClick={onRangeChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filter;
