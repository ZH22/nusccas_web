"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

// Typescript Interface for incoming data
type CCA = {
  id: number;
  name: string;
  description: string;
  website_url: string;
  logo_url: string;
  branch: string;
  ig_url: string;
}

export default function AllCCAList() {
  const [ccas, setCCAs] = useState<CCA[] | null>(null)

  useEffect(() => {
    const supabase = createClient();

    async function fetchCcas() {
      // Have to useEffect to run async fetch calls
      const { data, error } = await supabase
        .from('cca_data')
        .select('id, name, description, website_url, logo_url, branch, ig_url')
      
      setCCAs(data)
      if (error) {console.error(error)}
    }

    fetchCcas();

  }, []) 

  if (!ccas) {
    return(
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
        { [...Array(50)].map((e, i) => <Skeleton key={i} className="h-10 w-full"/>) }
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
      {ccas?.map((cca) => 
        <Popover key={cca.id}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="truncate p-5 cursor-pointer">
              <Avatar>
                <AvatarImage src={cca.logo_url} />
                <AvatarFallback>{cca.name.slice(0,2).toUpperCase() }</AvatarFallback>
              </Avatar>
              {cca.name}
            </Button>
          </PopoverTrigger> 
          <PopoverContent>{cca.description}</PopoverContent>
        </Popover> 
      )}
      
    </div>
  )
}