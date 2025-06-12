"use client"

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useSearchParams } from 'next/navigation'
import { useEffect } from "react"

export default function VerificationToast() {

  const searchParams = useSearchParams();
  const verificationRedirect = searchParams.get('verificationRedirect');

  useEffect(() => {
    if (verificationRedirect) {
      toast.success("Account Verified! You're Logged In")
    }

  }, [verificationRedirect])
  
  return (
    <Toaster richColors position="top-center"/>
  )
}