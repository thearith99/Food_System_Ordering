'use client'

// React Imports
import { useState, useEffect } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars

const AddUserDrawer = ({ open, handleClose }) => {
  const [nameBranch, setNameBranch] = useState('')
  const [locationId, setLocationId] = useState('')
  const [Locations, setLocations] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null) // Reset error state on component mount
  }, [open]) // Reset error state when the drawer opens or closes

  useEffect(() => {
    // Fetch Locations from API
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/api/locations')
        setLocations(response.data)
      } catch (error) {
        console.error('Error fetching Locations:', error)
      }
    }
    fetchLocations()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataObj = new FormData()
    formDataObj.append('name', nameBranch)
    formDataObj.append('locationId', locationId)

    try {
      await axios.post('/api/branch', formDataObj)
      handleClose()
      setNameBranch('')
      setLocationId('')
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data submitted successfully!'
      }).then(() => {
        window.location.reload() // Refresh the page
      })
    } catch (error) {
      setError('Failed to submit data. Please try again.')
    }
  }

  const handleReset = () => {
    handleClose()
    setNameBranch('')
    setLocationId('')
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add New Branch</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='Branch Name'
            fullWidth
            value={nameBranch}
            onChange={e => setNameBranch(e.target.value)}
          />

          <FormControl fullWidth>
            <CustomTextField
              labelId='location-label'
              value={locationId}
              label='Location'
              select
              onChange={e => setLocationId(e.target.value)}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }
                  }
                }
              }}
            >
              {Locations.map(location => (
                <MenuItem key={location.id} value={location.id}>
                  {location.markName}
                </MenuItem>
              ))}
            </CustomTextField>
          </FormControl>
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
          {error && <Typography color='error'>{error}</Typography>}
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
