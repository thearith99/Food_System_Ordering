'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Component Imports
import Index from '@views/apps/location/index'
import Loading from '@views/apps/location/skeleton'

const ListLocation = () => {
  const Map = dynamic(() => import('../../../../../views/apps/location/map'), { ssr: false })

  // State to hold location data and loading state
  const [locationData, setLocationData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch location data from the API
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/locations')

      if (!res.ok) {
        throw new Error('Failed to fetch Location data')
      }

      const data = await res.json()
      setLocationData(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <Loading loading={loading} />
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (locationData.length === 0) {
    return <p>No location data available.</p>
  }

  return (
    <Box sx={{ flexGrow: 1, margin: 2 }}>
      <Grid container spacing={6} direction='column'>
        <Grid item xs={12}>
          <Index userData={locationData} />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: '500px', width: '100%' }}>
            <Map locationData={locationData} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ListLocation
