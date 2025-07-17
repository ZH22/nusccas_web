"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactNode } from "react"

import { createClient } from "@/utils/supabase/client"

export function JoinCcaAlertDialog({ children, cca_id, cca_name, user_id }: {children: ReactNode, cca_id: number, cca_name: string, user_id: string | undefined}) {

  // Remove CCA Membership (if there is) 
  async function addMembership() {
    console.log(cca_id)
    console.log(user_id)

    const supabase = createClient()
    const res = await supabase
      .from("cca_membership")
      .insert({cca_id: cca_id, profile_id: user_id})
    
    if (res.error) {console.log(res.error)}
    
    location.reload();
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        { children }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Join {cca_name}?</AlertDialogTitle>
          <AlertDialogDescription>
            Confirm to add yourself as a member!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={addMembership}>JOIN</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

    </AlertDialog>
  )
}
