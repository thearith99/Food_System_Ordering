import { useState, useEffect } from 'react'

import Swal from 'sweetalert2'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'

import CustomTextField from '@core/components/mui/TextField'

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

    const formDataObj = {
      markName,
      lat: parseFloat(lat),
      long: parseFloat(long)
    }

    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
      })

      if (!response.ok) {
        const errorText = await response.text()

        throw new Error(`Network response was not ok: ${response.statusText} - ${errorText}`)
      }

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
      console.error('Error submitting form:', error)
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
          {/* Mark Name Input */}
          <CustomTextField
            label='Mark Name'
            fullWidth
            value={markName}
            onChange={e => setMarkName(e.target.value)}
          />
          {/* Latitude Input */}
          <CustomTextField
            label='Lat'
            fullWidth
            value={lat}
            onChange={e => setLat(e.target.value)}
          />
          {/* Longitude Input */}
          <CustomTextField
            label='Long'
            fullWidth
            value={long}
            onChange={e => setLong(e.target.value)}
          />
          {/* Error Message */}
          {error && (
            <Typography variant='body2' color='error'>
              {error}
            </Typography>
          )}
          {/* Submit and Reset Buttons */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddLocation
