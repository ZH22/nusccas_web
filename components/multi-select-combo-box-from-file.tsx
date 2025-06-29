"use client";

import { useEffect, useState } from "react";
import { MultiSelectCombobox } from "@/components/multi-select-combo-box";
import type { Item } from "@/components/combo-box";

type Props = {
  filePath: string;
  value: string[];
  onValueChange: (value: string[]) => void;
};

export default function MultiSelectComboboxFromFile({
  filePath,
  value,
  onValueChange,
}: Props) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const file = await fetch(filePath);
      const text = await file.text();

      const parsedItems: Item[] = text
        .split(/\r?\n/) // splits file into an array of lines
        .map((word) => ({
          // value: word.toLowerCase().replace(/\s+/g, "_"),
          value: word,
          label: word,
        }));

      setItems(parsedItems);
    };

    fetchItems();
  }, [filePath]);

  return (
    <MultiSelectCombobox
      items={items}
      value={value}
      onValueChange={onValueChange}
    />
  );
}
