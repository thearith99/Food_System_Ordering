'use client'
import { useState, useEffect } from 'react'

// Component Imports
import UserList from '@views/apps/ordering'
import Loading from '@views/apps/ordering/skeleton'

const ListOrder = () => {
  // State to hold category data and loading state
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch category data from the API
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/order`)

      if (!res.ok) {
        throw new Error('Failed to fetch Order data')
      }
      const data = await res.json()
      setUserData(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!userData || userData.length === 0) {
    return <Loading loading={loading} />
  }

  return <UserList userData={userData} />
}

export default ListOrder
