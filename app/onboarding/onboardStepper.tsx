"use client";

import Stepper, {
  Step,
} from "@/components/reactBitsComponents/Stepper/Stepper";
import { useState } from "react";
// import { Combobox } from "@/components/combo-box";
// import ComboboxFromFile from "@/components/combo-box-from-file";
// import { MultiSelectCombobox } from "@/components/multi-select-combo-box";
import MultiSelectComboboxFromFile from "@/components/multi-select-combo-box-from-file";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicInputs } from "@/components/dynamic-inputs";

export default function OnboardStepper() {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [religion, setReligion] = useState("");
  const [majors, setMajors] = useState<string[]>([]);
  const [minors, setMinors] = useState<string[]>([]);
  const [ccas, setCcas] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  return (
    <Stepper
      initialStep={1}
      // onStepChange={(step) => { console.log(step); }}
      onFinalStepCompleted={() =>
        console.log(name, race, religion, majors, minors, ccas, interests)
      }
      backButtonText="Previous"
      // backButtonProps={{ className: "cursor-pointer" }}
      nextButtonText="Next"
      // nextButtonProps={{ className: "cursor-pointer " }}
    >
      <Step>
        <h2 className="text-4xl font-bold">Welcome to nusCCAs!</h2>
        <br />
        <p>Let's find out more about you</p>
      </Step>

      <Step>
        <h2 className="text-2xl font-bold">What's your name?</h2>
        <br />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </Step>

      <Step>
        <h2 className="text-2xl font-bold">What's your race?</h2>
        <br />
        <Select value={race} onValueChange={setRace}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Race" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Chinese">Chinese</SelectItem>
              <SelectItem value="Malay">Malay</SelectItem>
              <SelectItem value="Indian">Indian</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
              <SelectItem value="Secret">Prefer not to state</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Step>

      <Step>
        <h2 className="text-2xl font-bold">What's your religion?</h2>
        <br />
        <Select value={religion} onValueChange={setReligion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Religion" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Buddhist">Buddhist</SelectItem>
              <SelectItem value="Christian">Christian</SelectItem>
              <SelectItem value="Catholic">Catholic</SelectItem>
              <SelectItem value="Muslim">Muslim</SelectItem>
              <SelectItem value="Hindu">Hindu</SelectItem>
              <SelectItem value="Sikh">Sikh</SelectItem>
              <SelectItem value="None">No religion</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
              <SelectItem value="Secret">Prefer not to state</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Step>

      <Step>
        <h2 className="text-2xl font-bold">What's your major?</h2>
        <br />
        <h2 className="text-sm text-gray-500">You may select more than one.</h2>
        <MultiSelectComboboxFromFile
          filePath="/all_nus_majors.txt"
          value={majors}
          onValueChange={setMajors}
        />
      </Step>

      <Step>
        <h2 className="text-2xl font-bold">What's your minor (if any)?</h2>
        <br />
        <h2 className="text-sm text-gray-500">You may select more than one.</h2>
        <MultiSelectComboboxFromFile
          filePath="/all_nus_minors.txt"
          value={minors}
          onValueChange={setMinors}
        />
      </Step>

      <Step>
        <h2 className="text-2xl font-bold pb-2">
          What are your current and past CCAs?
        </h2>
        <DynamicInputs value={ccas} onValueChange={setCcas} />
      </Step>

      <Step>
        <h2 className="text-2xl font-bold">What are your interests?</h2>
        <br />
        <DynamicInputs value={interests} onValueChange={setInterests} />
      </Step>

      <Step>
        <h2 className="text-2xl font-bold">Thank You!</h2>
        <br />
        <p>Our AI model is working hard to find the perfect CCAs for you.</p>
      </Step>

      {/* onFinalStepCompleted => Callback fired after user finishes the final Step */}
    </Stepper>
  );
}
