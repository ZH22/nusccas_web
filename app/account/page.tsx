import { Button } from '@/components/ui/button'
import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PencilLine } from 'lucide-react'

export default async function Account() {
  const supabase = await createClient()
  const {data: { user }, error} = await supabase.auth.getUser()

  
  const { data } = await supabase
    .from("profiles")
    .select("isOnboarded")
    .eq("id", user?.id)
    .single();

  // Redirect if unauthenticated
  if (error || !user) {
    redirect('/login')
  } else if (!data?.isOnboarded) {
    redirect('/onboarding')
  } 

  return (
    <>
      <div className='mb-10'>
        <p>To update your profile CCAs and Interests.</p>
        <Link href="/onboarding" className='inline'>
          <Button className='cursor-pointer' variant={'outline'}>
            <PencilLine />
            <p className=''>Click Here</p>
          </Button>
        </Link>
      </div>
      <AccountForm user={user} /> 
    </>
  )
}