<<<<<<< HEAD
// Component Imports
import CategoryList from '@views/apps/items/list'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
}

const UserListApp = async () => {
  // Vars
  const data = await getData()

  return <CategoryList userData={data} />
}

export default UserListApp
=======
'use client'

// React Imports
// Component Imports
import UserList from '@/views/apps/items/list'

const ListCategory = () => {
  return <UserList />
}

export default ListCategory
>>>>>>> origin/master
