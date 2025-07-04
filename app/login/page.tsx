import { LoginForm } from "@/components/login-form"
import { login } from './actions'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lightbulb } from "lucide-react"
import Footer from "@/components/landingPageComponents/Footer"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">

        {/* Temporary Alert for Milestones */}
        <Alert variant="default" className="text-amber-600 dark:text-amber-300 bg-muted mb-3">
          <Lightbulb />
          <AlertTitle className="text-xl">Heads Up!</AlertTitle>
          <AlertDescription className="text-l">
            Previously created User Accounts for testing in Milestone 1 [prior to 10 June 2025] has been removed. Please try our Sign Up feature again!
          </AlertDescription>
        </Alert>

        <LoginForm onLogin={login}/>
      </div>

      <Footer />
    </div>
  )
}
