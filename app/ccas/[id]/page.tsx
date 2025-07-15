import CcaPage from "./cca-page";
import ReviewSection from "@/components/cca-review-section";
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("cca_data")
    .select("id")
    .eq("id", id)
    .single();

  if (error) return <div>Invalid page</div>;

  return (
    <>
      <CcaPage id={id_num} />
      <br />
      <br />
      <br />
      <ReviewSection cca={id_num} user={user} />
    </>
  );
}
