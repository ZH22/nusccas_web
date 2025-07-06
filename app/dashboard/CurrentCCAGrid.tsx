"use client"

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link"

type CCA = {
  id: number;
  name: string;
  logo_url: string;
}

export default function CurrentCCAGrid() {

  const [ccas, setCCAs] = useState<CCA[] | null>(null)
  useEffect(() => {
    const supabase = createClient();

    async function fetchCcas() {
      const {data: { user }} = await supabase.auth.getUser()
      const { data } = await supabase
      .from("profiles")
      .select(`
        cca_membership (cca_data(id, name, logo_url))
      `)
      .eq("id", user?.id)

      if (data === null) {return null}
      const currentCCAs: CCA[] = data[0].cca_membership.flatMap(membership => membership.cca_data)
      setCCAs(currentCCAs)
    }

    fetchCcas();

  }, []) 

  if (!ccas) {
    return(
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl m-auto">
        { [...Array(5)].map((e, i) => <Skeleton key={i} className="h-7 w-full rounded-full"/>) }
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 m-auto max-w-5xl my-3">
      {ccas?.map((cca) =>
        <Button key={cca.id} variant={"outline"} className="cursor-pointer">
          <Avatar className="rounded-full">
            <AvatarImage src={cca.logo_url} className="w-5"/>
            <AvatarFallback>{cca.name.slice(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {cca.name}
        </Button>
      )}
      <Link href="/manage/myccas">
        <Button key="more" variant={"outline"} className="w-full cursor-pointer bg-gray-200 border-gray-400">
            Add More....
        </Button>
      </Link>
    </div>
  )
}