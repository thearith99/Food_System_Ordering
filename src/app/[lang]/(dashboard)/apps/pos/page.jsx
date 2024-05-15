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
