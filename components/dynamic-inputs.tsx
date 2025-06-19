"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

export interface DynamicInputsProps {
  value?: string[];
  onValueChange?: (values: string[]) => void;
}

export function DynamicInputs({
  value = [],
  onValueChange,
}: DynamicInputsProps) {
  const [inputs, setInputs] = useState<{ id: string; value: string }[]>( // time used as the unique id
    value.map((value) => ({ id: Date.now().toString() + value, value })) // loads the saved previously written inputs
  );

  const addInput = () => {
    const newInputs = [...inputs, { id: Date.now().toString(), value: "" }];
    setInputs(newInputs);
    onValueChange?.(newInputs.map((input) => input.value));
  };

  const removeInput = (id: string) => {
    const newInputs = inputs.filter((input) => input.id !== id);
    setInputs(newInputs);
    onValueChange?.(newInputs.map((input) => input.value));
  };

  const handleInputChange = (id: string, value: string) => {
    const newInputs = inputs.map((input) =>
      input.id === id ? { ...input, value } : input
    );
    setInputs(newInputs);
    onValueChange?.(newInputs.map((input) => input.value));
  };

  return (
    <div className="space-y-4">
      <Button onClick={addInput}>
        <Plus />
        Add more
      </Button>

      <div className="space-y-3">
        {inputs.map((input) => (
          <div key={input.id} className="flex items-center gap-2">
            <Input
              value={input.value}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              placeholder="CCA"
            />
            <Button onClick={() => removeInput(input.id)}>
              <Minus />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
