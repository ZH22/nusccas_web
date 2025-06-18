"use client"

import { Button } from "@/components/ui/button"

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { InstagramIcon, SchoolIcon } from "lucide-react"

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
        <Dialog key={cca.id}>
          <DialogTrigger asChild>
            <Button variant="outline" className="p-5 py-7 cursor-pointer">
              <div className="flex gap-3 max-w-50 truncate justify-start text-lg text-gray-400">
                <Avatar>
                  <AvatarImage src={cca.logo_url} className="z-0"/>
                  <AvatarFallback>{cca.name.slice(0,2).toUpperCase() }</AvatarFallback>
                </Avatar>
                {cca.name}
              </div>
           </Button>
          </DialogTrigger> 

          <DialogContent className="dark:bg-gray-700">
            <DialogHeader>
              <DialogTitle>{cca.name}</DialogTitle>
            </DialogHeader>
            <DialogDescription>CCA Info</DialogDescription>
            <div className="flex flex-col gap-5 items-center">
              <Image alt={cca.name} src={cca.logo_url} width={100} height={100} className="rounded-full"/>
              <div className="border border-gray-300 p-3 rounded-2xl">{cca.branch}</div>
              <div className="flex gap-5">
                {cca.ig_url && <Link href={cca.ig_url} target="_blank"><InstagramIcon /></Link>}
                {cca.website_url && <Link href={cca.website_url} target="_blank"><SchoolIcon /></Link>}
              </div>
            </div>
          </DialogContent>
        </Dialog> 
      )}
      
    </div>
  )
}