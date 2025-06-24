import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import OnboardStepper from "./onboardStepper";

export default async function Onboarding() {
  const supabase = await createClient();

  // Check if user authenticated
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  // Redirect if unauthenticated
  if (error || !user) {
    redirect("/login");
  }

  // Grab data about user's preferences (if any) and pass over to client component

  return (
    <>
      <h1>Onboarding</h1>
      <OnboardStepper user={user} />
    </>
  );
}
