'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
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
  
  // Update Profile Function (Ignored for now) ===========================
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
    <div className="form-widget">
      {/* ... */}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={first_name || ''}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ first_name })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div> 
      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}