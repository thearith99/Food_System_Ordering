// Component Imports
'use client'
import { useEffect, useState } from 'react'
import Categories from '@views/apps/food'
const CategoriesApp = () => {
  // State to store the retrieved data
  const [userData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/apps/products/')
      const data = await response.json()
      setUserData(data)
      setIsLoading(false)
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
