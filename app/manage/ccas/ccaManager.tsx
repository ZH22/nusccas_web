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

async function getMemberData(): Promise<CCA[]> {
  // Fetch data from your API here.
  const supabase = createClient(); 

  // If CCA Leader -> Only show data of CCAs that they are in-charge of
  const { data } = await supabase
        .from('cca_data')
        .select('id, name, branch')

  if (data == null) { return [] }
  return data
}

export default async function CCAManager({role}: {role: string}) {
  let data: CCA[] = []

  if (role === "admin") {
    data = await getAllData()
  } 
  else if (role === "cca-leader") {
    data = await getMemberData()
  } 

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}