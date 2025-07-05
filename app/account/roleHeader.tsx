'use client'
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function RoleHeader({role, id}: {role: string|null, id: string}) {
  const router = useRouter();

  async function changeRole(newRole: string | null) {
    const supabase = createClient();  

    const { error } = await supabase
      .from("profiles")
      .update({
        roles: newRole
      })
      .eq("id", id as string); 

    if (error) {console.log(error)}
    else {
      router.refresh()
      console.log("reloaded")
      toast.info(`Account has been updated to ${newRole ? newRole.toUpperCase() : "NORMAL"}`)
    }
  }

  return (
    <div className="border-amber-500 border-2 p-2 rounded-lg">
      <h2 className='text-3xl font-bold mb-2'>{role == null ? 'normal user' : role }</h2>
      <div className='flex gap-3'>
        <Button className='cursor-pointer rounded-full' variant={'outline'} onClick={async () => { await changeRole(null)}}>Normal</Button>
        <Button className='cursor-pointer rounded-full' variant={'outline'} onClick={async () => { await changeRole('cca-leader')}}>CCA Leader</Button>
        <Button className='cursor-pointer rounded-full' variant={'outline'} onClick={async () => { await changeRole('admin')}}>Admin</Button>
      </div>
      <p className="font-extralight my-2">* Only here as a demo to allow for testing of all types of user roles [click to change]</p>
    </div>

  )
}