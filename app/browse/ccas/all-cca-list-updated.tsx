// redirects user to the respective nusCCAs CCA page of the CCA clicked

"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// Typescript Interface for incoming data
type CCA = {
  id: number;
  name: string;
  logo_url: string;
};

export default function AllCCAList() {
  const [ccas, setCCAs] = useState<CCA[] | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchCcas() {
      // Have to useEffect to run async fetch calls
      const { data, error } = await supabase
        .from("cca_data")
        .select("id, name, logo_url");

      setCCAs(data);
      if (error) {
        console.error(error);
      }
    }

    fetchCcas();
  }, []);

  if (!ccas) {
    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
        {[...Array(50)].map((e, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
      {ccas?.map((cca) => (
        <Button
          className="p-5 py-7 cursor-pointer"
          key={cca.id}
          variant="outline"
          onClick={() => window.open("/ccas/" + cca.id)}
        >
          <div className="flex gap-3 max-w-50 truncate justify-start text-lg text-gray-400">
            <Avatar>
              <AvatarImage src={cca.logo_url} className="z-0" />
              <AvatarFallback>
                {cca.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {cca.name}
          </div>
        </Button>
      ))}
    </div>
  );
}
