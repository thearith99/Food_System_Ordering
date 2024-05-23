<<<<<<< HEAD
'use client'

// Component Imports
import Pos from '@views/apps/pos/page.jsx'

const PosList =  () => {
  return <Pos />
}

export default PosList;
=======
// Component Imports
import Pos from '@views/apps/pos/index.jsx'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
}

const PosListApp = async () => {
  // Vars
  const data = await getData()

  return <Pos userData={data} />
}

export default PosListApp;
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
