"use client";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { XIcon, ChevronDown, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Select({
  placeholder = "Select from",
  options,
  selected,
  setSelected,
  isMultiple = false,
}) {
  const [open, setOpen] = useState(false);
  const onSelect = (option) => {
    if (isMultiple) {
      if (selected.includes(option.value)) {
        setSelected(selected.filter((currValue) => currValue !== option.value));
      } else {
        setSelected([...selected, option.value]);
      }
    } else {
      setSelected(option.value);
      setOpen(false);
    }
  };
  const onRemove = (value) => {
    setSelected(selected.filter((currValue) => currValue !== value));
  };
  const onClearAll = () => {
    setSelected(isMultiple ? [] : null);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          className="px-3 flex justify-between dark:bg-card"
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          <div>
            {Array.isArray(selected) && selected.length > 0
              ? selected.map((value) => {
                  const option = options.find(
                    (currOption) => currOption.value === value
                  );
                  return (
                    <Badge className="my-2" key={value}>
                      {option.label}
                      <span
                        onClick={(event) => {
                          event.stopPropagation(event);
                          onRemove(value);
                        }}
                      >
                        <XIcon className="mx-2 w-4 h-4 cursor-pointer" />
                      </span>
                    </Badge>
                  );
                })
              : (selected &&
                  options.find((currOption) => currOption.value === selected)
                    ?.label) ||
                placeholder}
          </div>
          <div className="flex items-center gap-1">
            {selected && selected.length > 0 && (
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  onClearAll();
                }}
              >
                <XIcon className="w-4 h-4 shrink-0 opacity-50" />
              </span>
            )}
            <ChevronDown className="w-4 h-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>Nothing found</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => onSelect(option)}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "my-auto w-4 h-4",
                      (
                        isMultiple
                          ? selected.includes(option.value)
                          : selected === option.value
                      )
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Select;
