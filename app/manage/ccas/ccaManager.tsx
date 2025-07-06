import { User } from "@supabase/supabase-js";
import { columns, CCA } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from "@/utils/supabase/client"


async function getAllData(): Promise<CCA[]> {
  // Fetch data from your API here.
  const supabase = createClient(); 
  // If admin -> Show all the CCAs
  const { data } = await supabase
        .from('cca_data')
        .select('id, name, branch')

  if (data == null) { return [] }
  return data
}

async function getMemberData(user: User): Promise<CCA[]> {
  // Fetch data from your API here.
  const supabase = createClient(); 

  // If CCA Leader -> Only show data of CCAs that they are in-charge of
  const { data: cca_ids } = await supabase
    .from('cca_membership')
    .select('cca_id')
    .eq('profile_id', user?.id)
    .eq('is_leader', true)

  const cca_ids_flattened = cca_ids?.flatMap(ccaObj => ccaObj.cca_id)
  
  if (cca_ids_flattened == null) {return []}

  const { data } = await supabase
    .from('cca_data')
    .select('id, name, branch')
    .in('id', cca_ids_flattened)
  
  if (data == null) { return [] }
  return data
}

export default async function CCAManager({role, user}: {role: string, user: User}) {
  let data: CCA[] = []

  if (role === "admin") {
    data = await getAllData()
  } 
  else if (role === "cca-leader") {
    data = await getMemberData(user)
  } 

  return (
    <div className="container mx-auto py-10">
      {role ===  "cca-leader" && <div>Showing CCAs under you</div>}
      {role ===  "admin" && <div>Showing All CCAs</div>}
      <DataTable columns={columns} data={data} />
    </div>
  );
}