"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Item {
  value: string;
  label: string;
}

type ItemListProp = {
  items: Item[];
  value: string[];
  onValueChange: (value: string[]) => void;
};

export const MultiSelectCombobox: React.FC<ItemListProp> = ({
  items,
  value = [],
  onValueChange,
}) => {
  const [open, setOpen] = React.useState(false);
  //const [value, setValue] = React.useState<string[]>([]);

  const handleSetValue = (val: string) => {
    const newValue = value.includes(val)
      ? value.filter((item) => item !== val)
      : [...value, val];
    onValueChange(newValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          <div className="flex gap-2 justify-start">
            {value?.length
              ? value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium dark:bg-slate-800"
                  >
                    {items.find((item: Item) => item.value === val)?.label}
                  </div>
                ))
              : "Select..."}
          </div>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {items.map((item: Item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    //setValue(currentValue === value ? "" : currentValue);
                    handleSetValue(currentValue);
                    //setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      //value === item.value ? "opacity-100" : "opacity-0"
                      value.includes(item.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
