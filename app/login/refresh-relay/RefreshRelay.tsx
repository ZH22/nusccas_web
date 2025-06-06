'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function RefreshRelay() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const handleFlow = async () => {
      const returnUrl = searchParams.get('return') || '/'
      const forceReload = searchParams.get('reload') === 'true'

      // SAFELY remove query params without causing a rerender loop
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', '/login/refresh-relay')
      }

      // Sync session with Supabase
      await supabase.auth.getSession()

      if (forceReload) {
        window.location.href = returnUrl // Full reload to target page
      } else {
        router.replace(returnUrl)        // SPA navigation
      }
    }

    handleFlow()
    // Only run once after mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array prevents rerun

  return null // No need to render anything, fallback handles UI
}
