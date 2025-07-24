import EventPage from "./event-page";
import { createClient } from "@/utils/supabase/server";

export default async function CCA({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const id_num = Number(id);

  if (isNaN(id_num) || id_num <= 0) {
    return <div>Invalid page</div>;
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("events")
    .select("id")
    .eq("id", id)
    .single();

  if (error) return <div>Invalid page</div>;

  return (
    <>
      <EventPage id={id_num} />
    </>
  );
}
