'use client'
import { useState, useEffect } from 'react'


// MUI Imports
import Grid from '@mui/material/Grid'

import Loading from '@views/apps/items/list/skeleton'

// Component Imports
import FoodTable from './FoodTable'

const Products = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch category data from the API
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/products`)

      if (!res.ok) {
        throw new Error('Failed to fetch category data')
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


return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FoodTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default Products
