import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'

import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react";
import RecoGrid from "./RecoGrid";
import Footer from "@/components/landingPageComponents/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import CurrentCCAGrid from "./CurrentCCAGrid";

export default async function Dashboard() {
  const supabase = await createClient();

  // Check if user authenticated
  const {data: { user }, error} = await supabase.auth.getUser()
  // Redirect if unauthenticated
  if (error || !user) {
    redirect('/login')
  }


  const { data: cca_data } = await supabase
    .from('cca_data')
    .select('id, name, website_url, logo_url, branch, ig_url')
    .range(0, 20);

  if(!cca_data) {
    return <p>No CCA Data :/</p>
  }

  const { data } = await supabase
    .from("profiles")
    .select("recommendations, isOnboarded, roles")
    .eq("id", user?.id)
    .single();

  // Redirect if user not onbaorded
  if (!data?.isOnboarded) {
    redirect('/onboarding')
  } 

  
  const PlaceholderCards = ({ className }: {className?:string}) => {
    return (
      <div className={className + ` flex flex-col space-y-3`}>
        <Skeleton className="h-[125px] w-[250px] rounded-xl m-auto mb-3 dark:bg-slate-800 bg-slate-300" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] m-auto mb-3 bg-slate-300 dark:bg-slate-800" />
          <Skeleton className="h-4 w-[200px] m-auto mb-3 bg-slate-300 dark:bg-slate-800" />
        </div>
      </div>
    )
  }


  return(
    <>
      <h2 className="text-center text-5xl font-bold">Dashboard</h2>

      {/* If Admin or CCA Leaders (will see) */}
      {data.roles !== null && 
        <div className="flex max-w-5xl m-auto p-3 gap-5 border-green-700 border-2 rounded-2xl mt-3 flex-wrap">
          <Button variant={"ghost"}>Admin Features:</Button>
          <Link href={"/manage/ccas"}>
            <Button variant={"outline"} className="cursor-pointer">Manage CCAs</Button>
          </Link>
          {data.roles == "admin" && <Link href={"/manage/leaders"}>
            <Button variant={"outline"} className="cursor-pointer">Manage Leaders</Button>
          </Link>}
        </div>
      }

      {/* CURRENT CCAS ============================================================================================ */}
       <Accordion type="single" collapsible defaultValue="currentCCAs">
        <AccordionItem value="currentCCAs">
          <div className=" bg-blue-200 dark:bg-blue-700 px-5 rounded-2xl max-w-5xl m-auto mt-5">
            <AccordionTrigger>
              <h3 className="text-xl text-center">Your CCAs!</h3>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <CurrentCCAGrid />
          </AccordionContent>
        </AccordionItem>
       </Accordion>

      {/* RECOMMENDED ============================================================================================ */}
      { (data?.isOnboarded && !data.recommendations) && 
        <div>
          <div className="relative py-5 max-w-4xl m-auto">
            <div className="bg-gray-200 dark:bg-gray-700 p-5 rounded-2xl mb-10">
              <h3 className="text-xl">Your Recommendations are pending! Come back and refresh in a few minutes</h3>
              <Loader2 className="animate-spin"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <PlaceholderCards />
              <PlaceholderCards />
              <PlaceholderCards />
              <PlaceholderCards className="hidden md:block"/>
              <PlaceholderCards className="hidden md:block"/>
              <PlaceholderCards className="hidden md:block"/>
            </div>
          </div>
        </div>
      }

      { (data?.isOnboarded && data.recommendations) && 
        <Accordion type="single" collapsible defaultValue="recommendedCCAs">

          <AccordionItem value="recommendedCCAs">
            <div className=" bg-gray-200 dark:bg-gray-700 px-5 rounded-2xl max-w-5xl m-auto mt-5">
              <AccordionTrigger>
                <h3 className="text-xl text-center">Your Recommended CCAs! 
                  <span className="font-light text-sm italic">🤖Model Guided Recommendation🤖</span>
                </h3>
              </AccordionTrigger>
            </div>
            <AccordionContent>
              <div className="relative py-5 max-w-5xl m-auto">
                <RecoGrid /> 
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion> 
      }

      <Footer />
    </>
  )
}
