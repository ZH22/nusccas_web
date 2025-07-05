import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'

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
        <h1 className="font-bold text-4xl">Sorry you're not allowed here</h1>
        <img src="/unauthorised.svg" className="max-w-lg" />
      </div>
    )
  }
  // ===============================================================

  return (
    <div>
      <h1>Manage CCAs</h1>
    </div>
  );
}