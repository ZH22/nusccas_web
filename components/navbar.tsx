'use client'

import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export function Navbar() {

  const {user, isLoading} = useAuth();

  // Before Session is checked on first load
  if (isLoading) {
    return (
      <nav className="flex justify-between">
      <ul className="flex gap-5">

      </ul> 

      <ModeToggle />
    </nav>
    )
  }

  return(
    <nav className="flex justify-between">
      <ul className="flex gap-5">
        {user && <li className=""><Link href="/">Home</Link></li>}
        {user && <li className=""><Link href="/account">Account</Link></li>}
        {!user && <li><Link href="/login">Login</Link></li>}
        {!user && <li><Link href="/login/signup">Sign Up</Link></li>}
      </ul> 

      <ModeToggle />
    </nav>
  )
}