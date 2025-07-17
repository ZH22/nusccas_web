import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'
import CCAManager from "./ccaManager";
import Image from "next/image";

export default async function ManageCCAs() {
  
  // Standard Auth and Role checking (Repeated) ====================
  const supabase = await createClient(); 
  const {data: { user }, error} = await supabase.auth.getUser()
  // Redirect if unauthenticated
  if (error || !user) {
    redirect('/login')
  }
  // Get user Roles
  const { data } = await supabase.from("profiles").select("roles").eq("id", user?.id).single();
  if (data?.roles == null){
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
      <h1 className="font-bold text-2xl text-center">Manage CCAs</h1>
      <CCAManager role={data.roles} user={user}/>
    </div>
  );
}