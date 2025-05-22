import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export function Navbar() {
  return(
    <nav className="flex justify-between">
      <ul className="flex gap-5">
        <li className="">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/login/signup">Sign Up</Link>
        </li>
      </ul> 

      <ModeToggle />
    </nav>
  )
}