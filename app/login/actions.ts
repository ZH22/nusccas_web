'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { isAuthApiError } from '@supabase/supabase-js'

export async function login(previousState: unknown, formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (isAuthApiError(error)) {
    // Handle the Authentication Api Error on client
    return error
  } else if (error) {
    redirect('/error')
  }

  
  revalidatePath('/', 'layout')
  redirect('/login/refresh-relay?return=/account&reload=true') 
  
} 

