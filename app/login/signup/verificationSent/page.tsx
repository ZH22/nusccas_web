
import Image from "next/image"
import emailSent_light from "../../../../public/emailSent_light.svg"
import emailSent_dark from "../../../../public/emailSent_dark.svg"

export default function Page() {
  return(
    <div className="flex flex-col mt-10 gap-5 items-center">
      <div className="max-w-60">
        <Image className="hidden dark:block" src={ emailSent_dark } alt="email verification sent illustration"/>
        <Image className="block dark:hidden" src={ emailSent_light } alt="email verification sent illustration"/>
      </div>

      <h1 className="text-4xl font-bold text-center text-gray-700 dark:text-gray-300">Email Verification Sent!</h1>
      <p className="dark: text-gray-300">Check your email for the verification process</p>
    </div>
  )
}