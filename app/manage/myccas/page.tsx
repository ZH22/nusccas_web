"use client"
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Flame, X } from "lucide-react";
import { LeaveCcaAlertDialog } from "./leaveCcaAlertDialog";
import { JoinCcaAlertDialog } from "./joinCcaAlertDialog";

type CCA = {
  id: number;
  name: string;
  logo_url: string;
}

export default function MyCCAPage() {
 
  const [currentCcas, setCurrentCCAs] = useState<CCA[] | null>(null)
  const [otherCcas, setOtherCCAs] = useState<CCA[] | null>(null)
  const [userID, setUserID] = useState<string | undefined>(undefined)

  useEffect(() => {

    async function fetchCcas() {
      const supabase = createClient();
      const {data: { user }} = await supabase.auth.getUser()
      setUserID(user?.id)
      const { data } = await supabase
      .from("profiles")
      .select(`
        cca_membership (cca_data(id, name, logo_url))
      `)
      .eq("id", user?.id)

      if (data === null) {return null}
      const currents: CCA[] = data[0].cca_membership.flatMap(membership => membership.cca_data)
      setCurrentCCAs(currents)

      
      const currentCCAIds = "(" + currents?.flatMap(cca => cca.id).toString() + ")"
      
      async function fetchOtherCCAs() {
        const supabase = createClient();
        const { data } = await supabase
          .from("cca_data")
          .select(`
            id, name, logo_url
          `)
          .not('id', 'in', currentCCAIds)
        
        setOtherCCAs(data)
      }
      fetchOtherCCAs();
    }

    fetchCcas();

  }, []) 

  if (!currentCcas || !otherCcas) {
    return(
      <div className="mx-5 md:mx-auto max-w-5xl">
        <h1>My CCA Management</h1>
        <div className="my-10">
          <h3 className="font-bold">Your Current CCAs</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl m-auto">
            { [...Array(5)].map((e, i) => <Skeleton key={i} className="h-7 w-full rounded-full"/>) }
          </div>
        </div>

        <div>
          <h3 className="font-bold">Other CCAs. Click to Join!</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl m-auto">
            { [...Array(10)].map((e, i) => <Skeleton key={i} className="h-7 w-full rounded-full"/>) }
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-5 md:mx-auto max-w-5xl">
      <div className="my-10">
        <h3 className="font-bold">Your Current CCAs</h3>
        <div className="flex gap-2">
          <div className="rounded-full w-3 h-3 bg-amber-600 my-2"></div>
          <p className="text-sm">CCA-Leader</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 m-auto max-w-5xl my-3">
          {currentCcas?.map((cca) =>
            <LeaveCcaAlertDialog key={cca.id} cca_id={cca.id} cca_name={cca.name} user_id={userID}>
              <Button key={cca.id} variant={"outline"} className="flex justify-between cursor-pointer">
                {cca.name}
                <X />
              </Button>
            </LeaveCcaAlertDialog>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-bold">Other CCAs. Click to Join!</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 m-auto max-w-5xl my-3">
          {otherCcas?.map((cca) =>
            <JoinCcaAlertDialog key={cca.id} cca_id={cca.id} cca_name={cca.name} user_id={userID}>
              <Button key={cca.id} variant={"outline"} className="flex justify-between cursor-pointer overflow-clip">
                {cca.name}
                <Flame />
              </Button>
            </JoinCcaAlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}