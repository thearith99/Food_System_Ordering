// Component Imports
'use client'
import { useEffect, useState } from 'react'
import Categories from '@views/apps/categories'

const CategoriesApp = () => {
  // State to store the retrieved data
  const [userData, setUserData] = useState([])

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/apps/categories/')
      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <Categories userData={userData} />
    </div>
  )
}

export default CategoriesApp
