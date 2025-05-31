import Image from "next/image";
import explore_lightSVG from "../public/explore_light.svg"
import explore_darkSVG from "../public/explore_dark.svg"
import nusync_logo from "../public/NuSync_logo.png"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="">
      <main className="">

        <div className="w-full my-10 flex flex-col md:flex-row-reverse md:items-center md:justify-center gap-10">

          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold">Discover Your Next Adventure on Campus!</h1>
            <h3 className="font-light">Personalized recommendations for CCAs and events based on your interests</h3>
            <Button asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>

          <div>
            <Image className="hidden dark:block w-full"priority src={ explore_darkSVG } alt="Exploration Illustration" />
            <Image className="block dark:hidden w-full" priority src={ explore_lightSVG } alt="Exploration Illustration" />
          </div>
        </div>
      
        {/* <section>
          <h3>Upcoming Events</h3>
          <div className="w-full h-30 bg-blue-200"></div>
        </section>

        <section>
          <h3>Popular CCAs</h3>
          <div className="w-full h-30 bg-blue-200"></div>
        </section> */}

      </main>

      <footer className="mt-10">
        <p className="font-extralight text-sm underline dark:text-gray-300">Sourced from:</p>
        <Link href="https://nus.campuslabs.com/engage/" target="__blank">
          <Image src={ nusync_logo } alt="Nusync Logo" className="w-30 mt-2"/>
        </Link>
      </footer>
    </div>
  );
}
