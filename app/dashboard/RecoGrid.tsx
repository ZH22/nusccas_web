"use client";

import RecoCard from "./RecoCard";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";

type CCA = {
  id: string;
  name: string;
  description: string;
  website_url: string;
  logo_url: string;
  branch: string;
  ig_url: string;
};

export const PlaceholderCards = ({ className }: { className?: string }) => {
  return (
    <div className={className + ` flex flex-col space-y-3`}>
      <Skeleton className="h-[125px] w-[250px] rounded-xl m-auto mb-3 dark:bg-slate-800 bg-slate-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] m-auto mb-3 bg-slate-300 dark:bg-slate-800" />
        <Skeleton className="h-4 w-[200px] m-auto mb-3 bg-slate-300 dark:bg-slate-800" />
      </div>
    </div>
  );
};

export default function RecoGrid() {
  const [ccas, setCCAs] = useState<CCA[] | null>(null);
  const [topCcaNames, setTopCcaNames] = useState<string[]>([]);
  useEffect(() => {
    const supabase = createClient();

    async function fetchCcas() {
      async function fetchTopCCaNames() {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data } = await supabase
          .from("profiles")
          .select("recommendations, isOnboarded")
          .eq("id", user?.id)
          .single();

        return data?.recommendations;
      }

      const topCCAs: CCA[] = await fetchTopCCaNames();
      const topCcaNames: string[] = topCCAs.map((cca) => cca.name);
      setTopCcaNames(topCcaNames);

      // Have to useEffect to run async fetch calls
      const { data, error } = await supabase
        .from("cca_data")
        .select("id, name, description, website_url, logo_url, branch, ig_url")
        .in("name", topCcaNames);

      const orderedCca: CCA[] = topCcaNames
        .map((name) => data?.find((item) => item.name === name))
        .filter((item): item is CCA => item !== undefined);

      setCCAs(orderedCca);
      if (error) {
        console.error(error);
      }
    }

    fetchCcas();
  }, []);

  if (!ccas) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        {[...Array(10)].map((e, i) => (
          <PlaceholderCards key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 mx-3 md:mx-0 m-auto">
      {ccas?.map((cca) => (
        <RecoCard
          key={cca.id}
          title={cca.name}
          description={cca.description}
          imgSrc={cca.logo_url}
          ccaId={cca.id}
          topCCAs={topCcaNames}
        />
      ))}
    </div>
  );
}
