'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { logout } from '../logout/actions'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// ...
export default function AccountForm({ user }: { user: User | null }) {

  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  
  const [first_name, setFirstName] = useState<string | null>(null)

  // Get Profile information from database =============================
  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name`)
        .eq('id', user?.id)
        .single()
      if (error && status !== 406) {
        console.log(error)
        throw error
      }
      if (data) {
        setFirstName(data.first_name)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  // Performs after page renders =======================================
  useEffect(() => {
    getProfile()
  }, [user, getProfile])
  
  // Update Profile Function 
  async function updateProfile({
    first_name
  }: {
    first_name: string | null
  }) {
    try {
      setLoading(true)
      const { error } = await supabase.from('profiles').update({
        first_name: first_name,
        updated_at: new Date().toISOString(),
      }).eq('id', user?.id as string)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      console.log(error)
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  //  Page Tsx Content ===================================================
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="text" value={user?.email} disabled />
      </div>

      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          type="text"
          value={first_name || ''}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
    
      <div className='flex gap-3'>
        <Button
          onClick={() => updateProfile({ first_name })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      
        <Button variant="secondary" className='hover:cursor-pointer' onClick={() => logout()}>
          Sign out
        </Button>
      </div> 
    </div>
  )
}