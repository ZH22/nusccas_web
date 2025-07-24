import { User } from "@supabase/supabase-js";
import { columns, Event } from "./columns";
import { DataTable } from "./data-table";
import { createClient } from "@/utils/supabase/client";

async function getAllData(): Promise<Event[]> {
  // Fetch data from your API here.
  const supabase = createClient();
  // If admin -> Show all the Events
  const { data } = await supabase.from("events").select(`
      id,
      name, 
      events_host_ccas! event_id (cca_data (name))
    `);

  if (data == null) {
    return [];
  }
  return data as unknown as Event[];
}

async function getMemberData(user: User): Promise<Event[]> {
  // Fetch data from your API here.
  const supabase = createClient();

  // If CCA Leader -> Only show data of Events of CCAs that they are in-charge of
  const { data: cca_ids } = await supabase
    .from("cca_membership")
    .select("cca_id")
    .eq("profile_id", user?.id)
    .eq("is_leader", true);

  const cca_ids_flattened = cca_ids?.flatMap((ccaObj) => ccaObj.cca_id);

  if (cca_ids_flattened == null) {
    return [];
  }

  const { data: event_ids } = await supabase
    .from("events_host_ccas")
    .select("event_id")
    .in("cca_id", cca_ids_flattened);

  const event_ids_flattened = event_ids?.flatMap(
    (eventObj) => eventObj.event_id
  );

  if (event_ids_flattened == null) {
    return [];
  }

  const { data } = await supabase
    .from("events")
    .select(
      `
      id,
      name, 
      events_host_ccas! event_id (cca_data (name))
    `
    )
    .in("id", event_ids_flattened);

  if (data == null) {
    return [];
  }
  return data as unknown as Event[];
}

export default async function EventsManager({
  role,
  user,
}: {
  role: string;
  user: User;
}) {
  let data: Event[] = [];

  if (role === "admin") {
    data = await getAllData();
  } else if (role === "cca-leader") {
    data = await getMemberData(user);
  }

  return (
    <div className="container mx-auto py-10">
      {role === "cca-leader" && <div>Showing Events hosted by your CCAs</div>}
      {role === "admin" && <div>Showing All Events</div>}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
