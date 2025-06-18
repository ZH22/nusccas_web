'use client'

import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import { ChevronDownIcon, FilePenIcon, FolderTreeIcon, HomeIcon, KeyRoundIcon, LayoutDashboardIcon, Menu, UserRoundIcon } from "lucide-react";

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
    <nav className="md:w-4/5 md:my-8 md:mx-auto flex justify-between py-5 mx-5 sticky top-0 bg-gray-950 z-1500">
      <ul className="hidden gap-5 md:flex">
        {!user && <li className=""><Link href="/">Home</Link></li>}
        {user && <li className=""><Link href="/dashboard">Dashboard</Link></li>}
        {user && <li className=""><Link href="/account">Account</Link></li>}
        {!user && <li><Link href="/login">Login</Link></li>}
        {!user && <li><Link href="/login/signup">Sign Up</Link></li>}

        <li><Link href="/browse">Browse</Link></li>
      </ul> 
      
      {/* Only shown on Mobile */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeader>

          <ul className="grid grid-cols-2 gap-5 mx-10">
            {/* Anonymous Viewable */}
            {!user && <li className="">
              <Link href="/">
                <Button className="w-full h-full cursor-pointer"><HomeIcon />Home</Button>
              </Link>
            </li>}

            {!user && <li>
              <Link href="/login/signup" className="">
                <Button className="w-full h-full cursor-pointer"><FilePenIcon />Sign Up</Button>
              </Link>
            </li>}

            {!user && <li className="col-span-2">
              <Link href="/login">
                <Button className="w-full h-full cursor-pointer"><KeyRoundIcon />Login</Button>
              </Link>
            </li>}


            {/* Logged IN Viewable */}
            {user && <li className="">
              <Link href="/dashboard">
                <Button className="w-full h-full cursor-pointer"><LayoutDashboardIcon />Dashboard</Button>
              </Link>
            </li>}
            
            {user && <li className="">
              <Link href="/account">
                <Button className="w-full h-full cursor-pointer"><UserRoundIcon />Account</Button>
              </Link>
            </li>}              

            {user && <li className="">
              <Link href="/browse">
                <Button className="w-full h-full cursor-pointer"><FolderTreeIcon />Browse</Button>
              </Link>
            </li>} 
          </ul>
          
          <DrawerFooter>
            <DrawerClose>
              <ChevronDownIcon className="m-auto"/>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <ModeToggle />
    </nav>
  )
}