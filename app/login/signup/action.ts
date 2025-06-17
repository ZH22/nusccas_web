'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { isAuthApiError } from '@supabase/supabase-js'

export async function signup(formData: FormData) {
  const supabase = await createClient()
  
  // Determine Redirect Path
  const headersList = await headers()
  const hostname = headersList.get('host'); 

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: (hostname === "localhost:3000" ? 'http://localhost:3000' : "https://" + hostname) + "/?verificationRedirect=true"
    }
  }

  const { error } = await supabase.auth.signUp(data)

  
  if (isAuthApiError(error)) {
    // Handle the Authentication Api Error on client
    return error
  } else if (error) {
    redirect('/error')
  }

  console.log(error)

  revalidatePath('/', 'layout')
  redirect('/login/signup/verificationSent')
}