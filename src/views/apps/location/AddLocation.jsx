'use client'

// React Imports
import { useState, useEffect } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars

const AddLocation = ({ open, handleClose }) => {
  const [markName, setMarkName] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null) // Reset error state on component mount
  }, [open]) // Reset error state when the drawer opens or closes

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataObj = new FormData()
    formDataObj.append('markName', markName)
    formDataObj.append('lat', parseFloat(lat))
    formDataObj.append('long', parseFloat(long))

    try {
      await axios.post('/api/locations', formDataObj)
      handleClose()
      setMarkName('')
      setLat('')
      setLong('')
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
    setMarkName('')
    setLat('')
    setLong('')
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
        <Typography variant='h5'>Add New Location</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField label='Branch Name' fullWidth value={markName} onChange={e => setMarkName(e.target.value)} />
          <CustomTextField label='latitude' fullWidth value={lat} onChange={e => setLat(e.target.value)} />
          <CustomTextField label='longitude' fullWidth value={long} onChange={e => setLong(e.target.value)} />

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

export default AddLocation
