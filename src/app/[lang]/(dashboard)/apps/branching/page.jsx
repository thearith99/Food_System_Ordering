// Component Imports
import BranchList from '@views/apps/branch'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
}

const BranchListApp = async () => {
  // Vars
  const data = await getData()

  return <BranchList userData={data} />
}

export default BranchListApp
