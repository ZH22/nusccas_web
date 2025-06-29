"use client";

import Stepper, {
  Step,
} from "@/components/reactBitsComponents/Stepper/Stepper";
import { useCallback, useEffect, useState } from "react";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicInputs } from "@/components/dynamic-inputs";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function OnboardStepper({ user }: { user: User | null }) {
  const [firstName, setFirstName] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [majors, setMajors] = useState<string[]>([]);
  const [minors, setMinors] = useState<string[]>([]);
  const [ccas, setCcas] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  const supabase = createClient();

  // Get Profile information from database =============================
  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("first_name, race, religion, majors, minors, ccas, interests")
        .eq("id", user?.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        if (data["first_name"]) setFirstName(data["first_name"]); // "if" used so that if data is null, placeholder shows
        if (data["race"]) setRace(data["race"]);
        if (data["religion"]) setReligion(data["religion"]);
        if (data["majors"]) setMajors(data["majors"]);
        if (data["minors"]) setMinors(data["minors"]);
        if (data["ccas"]) setCcas(data["ccas"]);
        if (data["interests"]) setInterests(data["interests"]);
      }
    } catch (error) {
      console.log(error);
      alert("Error retrieving user data :(");
    }
  }, [user, supabase]);

  // Performs after page renders =======================================
  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfileAndRecommendCcas({
    firstName,
    race,
    religion,
    majors,
    minors,
    ccas,
    interests,
  }: {
    firstName: string;
    race: string;
    religion: string;
    majors: string[];
    minors: string[];
    ccas: string[];
    interests: string[];
  }) {
    // Update profile in Supabase
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          updated_at: new Date().toISOString(),
          race: race,
          religion: religion,
          majors: majors,
          minors: minors,
          ccas: ccas,
          interests: interests,
          isOnboarded: true // Set onboarded flag to true
        })
        .eq("id", user?.id as string);
      if (error) throw error;
      // alert("Profile updated!");
    } catch (error) {
      console.log(error);
      alert("Error uploading the results :(");
    }

    // API call to run CCA recommender AI model on user & CCA data in Lightning AI Studio
    const url = "/api/lightning_ai/run_cca_recommender";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user?.id as string }),
    };

    // AI Recommender call (To enable on deployment) ==========================
    // try {
    //   fetch(url, options); // no response expected
    //   //const response = await fetch(url, options);
    //   //const data = await response.json();
    //   //console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }

    redirect("/dashboard")

    // =================================================
  }

  return (
    <Stepper
      initialStep={1}
      // onStepChange={(step) => { console.log(step); }}
      onFinalStepCompleted={() =>
        // console.log(firstName, race, religion, majors, minors, ccas, interests)
        updateProfileAndRecommendCcas({
          firstName,
          race,
          religion,
          majors,
          minors,
          ccas,
          interests,
        })
      }
      backButtonText="Previous"
      // backButtonProps={{ className: "cursor-pointer" }}
      nextButtonText="Next"
      // nextButtonProps={{ className: "cursor-pointer " }}
    >
      <Step>
        <h2 className="text-4xl font-bold">Welcome to nusCCAs!</h2>
        <br />
        <p>{"Let's"} find out more about you</p>
      </Step>

      <Step>
        <h2 className="text-2xl font-bold">{"What's"} your first name?</h2>
        <br />
        <Input
          value={firstName == "" ? undefined : firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
      </Step>

      <Step>
        <h2 className="text-2xl font-bold">{"What's"} your race?</h2>
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
        <h2 className="text-2xl font-bold">{"What's"} your religion?</h2>
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
        <h2 className="text-2xl font-bold">{"What's"} your major?</h2>
        <br />
        <h2 className="text-sm text-gray-500">You may select more than one.</h2>
        <MultiSelectComboboxFromFile
          filePath="/all_nus_majors.txt"
          value={majors}
          onValueChange={setMajors}
        />
      </Step>

      <Step>
        <h2 className="text-2xl font-bold">{"What's"} your minor (if any)?</h2>
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
        <p>To confirm, please press 'Complete'</p>
        <br></br>
        <p>Our AI model will then update the perfect CCAs for you. Please allow some time</p>
      </Step>

      {/* onFinalStepCompleted => Callback fired after user finishes the final Step */}
    </Stepper>
  );
}
