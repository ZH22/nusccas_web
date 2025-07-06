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

export function LeaveCcaAlertDialog({ children, cca_id, cca_name, user_id }: {children: ReactNode, cca_id: number, cca_name: string, user_id: string | undefined}) {

  // Remove CCA Membership (if there is) 
  async function removeMembership() {
    console.log(cca_id)
    console.log(user_id)

    const supabase = createClient()
    const res = await supabase
      .from("cca_membership")
      .delete()
      .eq("cca_id", cca_id)
      .eq("profile_id", user_id)
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
          <AlertDialogTitle>Leaving {cca_name}!</AlertDialogTitle>
          <AlertDialogDescription>
            Confirm below to remove your membership. Any leadership position will also be removed. Please contact an administrator to reinstate leadership 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={removeMembership}>Confirm Leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

    </AlertDialog>
  )
}
