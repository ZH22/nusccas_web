// app/login/refresh-relay/page.tsx

import { Suspense } from 'react'
import RefreshRelay from './RefreshRelay' 

export default function Page() {
  return (
    <Suspense fallback={<div>Logging In...</div>}>
      <RefreshRelay />
    </Suspense>
  )
}
