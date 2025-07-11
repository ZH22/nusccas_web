"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { InstagramIcon, SchoolIcon } from "lucide-react";

// Typescript Interface for incoming data
type CCA = {
  id: number;
  name: string;
  description: string;
  website_url: string;
  logo_url: string;
  ig_url: string;
  branch: string;
};

export default function ccaPage({ id }: { id: number }) {
  const [cca, setCCA] = useState<CCA | null>(null);

  useEffect(() => {
    async function fetchCcaData() {
      // Have to useEffect to run async fetch calls
      const supabase = createClient();

      const { data, error } = await supabase
        .from("cca_data")
        .select("id, name, description, website_url, logo_url, ig_url, branch")
        .eq("id", id)
        .single();

      setCCA(data);
      if (error) {
        console.error(error);
      }
    }

    fetchCcaData();
  }, [id]);

  if (!cca) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Image
          alt={cca.name}
          src={cca.logo_url}
          width={75}
          height={75}
          className="rounded-full"
        />
        <h2 className="text-3xl font-bold">{cca.name}</h2>
        <Badge variant="destructive">{cca.branch}</Badge>
      </div>
      <br />
      <p className="whitespace-pre-line">{cca.description}</p>
      <br />
      <div className="flex gap-9">
        {cca.ig_url && (
          <Link href={cca.ig_url} target="_blank">
            <InstagramIcon />
          </Link>
        )}
        {cca.website_url && (
          <Link href={cca.website_url} target="_blank" className="flex gap-2">
            Join on NUSync
            <SchoolIcon />
          </Link>
        )}
      </div>
    </div>
  );
}
