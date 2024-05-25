'use client'
// pages/en/apps/pos/[id].jsx

import PosPage from '@views/apps/pos/POSpage' // Import your PosPage component

// Next Imports
import { redirect } from 'next/navigation'

// Component Imports

const PreviewPage = async ({ params }) => {
  // Vars

  return <PosPage id={params.id} />
}

export default PreviewPage
