import Image from "next/image";
import explore_lightSVG from "../public/explore_light.svg"
import explore_darkSVG from "../public/explore_dark.svg"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

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
      </main>
    </div>
  );
}
