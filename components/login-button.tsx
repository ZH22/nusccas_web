import { LoadingButton } from "./ui/loading-button"
import { useFormStatus } from "react-dom"

export default function LoginButton() {
  const { pending } = useFormStatus();
  return(
    <LoadingButton loading={ pending } disabled={pending} type="submit" className="w-full cursor-pointer">
      Login
    </LoadingButton>    
  )
}