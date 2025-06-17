
import Image from "next/image"
import emailSent_light from "../../../../public/emailSent_light.svg"
import emailSent_dark from "../../../../public/emailSent_dark.svg"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lightbulb } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return(
    <div className="flex flex-col mt-10 gap-5 items-center">
      <div className="max-w-60">
        <Image className="hidden dark:block" src={ emailSent_dark } alt="email verification sent illustration"/>
        <Image className="block dark:hidden" src={ emailSent_light } alt="email verification sent illustration"/>
      </div>

      <h1 className="text-4xl font-bold text-center text-gray-700 dark:text-gray-300">Email Verification Sent!</h1>
      <p className="dark: text-gray-300">Check your email for the verification process</p>
      <Alert variant="default" className="md:max-w-xl">
        <Lightbulb />
        <AlertTitle className="text-xl">Why am I not seeing it?</AlertTitle>
        <AlertDescription className="text-xl">
          If you did not receive any verification, your account has been activated!<Link href="/login" className="inline underline font-bold dark:text-white">Login</Link>
          or wait just a lil longer... server takes a while, broke students thing
        </AlertDescription>
      </Alert>

    </div>
  )
}