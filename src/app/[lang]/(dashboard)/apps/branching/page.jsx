<<<<<<< HEAD
const Branching = () => {
  return (
    <h1>Branching Page</h1>
  )
}

export default Branching

=======
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
>>>>>>> origin/master
