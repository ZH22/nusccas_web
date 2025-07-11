import CcaPage from "./cca-page";
import ReviewSection from "@/components/cca-review-section";
import { createClient } from "@/utils/supabase/server";

export default async function CCA({ params }: { params: { id: string } }) {
  const { id } = await params;
  const id_num = Number(id);

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

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
