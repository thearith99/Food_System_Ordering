'use client'

import { useState, useEffect } from 'react'

// Component Imports
import Index from '@views/apps/location/index'
import Loading from '@views/apps/location/skeleton'

const ListLocation = () => {
  // State to hold location data and loading state
  const [locationData, setLocationData] = useState(null)
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

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!locationData || locationData.length === 0) {
    return <Loading loading={loading} />
  }

  return <Index userData={locationData} />
}

export default ListLocation
