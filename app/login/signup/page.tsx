import { SignupForm } from "@/components/signup-form"
import { signup } from "./action"
import Footer from "@/components/landingPageComponents/Footer"

export default function Page() {
  return (
    <>
      <div className="flex w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm onSignup={signup}/>
        </div>
      </div>
      <Footer />
    </>
   
  )
}
