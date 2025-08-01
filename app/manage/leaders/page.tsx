import { createClient } from "@/utils/supabase/server"
import Image from "next/image";
import { redirect } from 'next/navigation'

export default async function ManageLeaders() {

  // Standard Auth and Role checking (Repeated) ====================
  const supabase = await createClient(); 
  const {data: { user }, error} = await supabase.auth.getUser()
  // Redirect if unauthenticated
  if (error || !user) {
    redirect('/login')
  }
  // Get user Roles
  const { data } = await supabase.from("profiles").select("roles").eq("id", user?.id).single();
  if (data?.roles != "admin"){
    return (
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl">Sorry you are not allowed here</h1>
        <Image alt="Unauthorised" src="/unauthorised.svg" className="max-w-lg" />
      </div>
    )
  }
  // ===============================================================
  
  return (
    <div>
      <h1>Manage CCA Leaders</h1>
    </div>
  );
}