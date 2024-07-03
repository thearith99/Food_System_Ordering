'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import axios from 'axios'
import Swal from 'sweetalert2'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@core/components/mui/TextField'

const UpdateBranch = ({ branch }) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({})
  const [locations, setLocations] = useState([])
  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const response = await axios.get('/api/locations')
      setLocations(response.data)
    } catch (error) {
      console.error('Error fetching Locations:', error)
    }
  }
  useEffect(() => {
    setData(branch)
  }, [branch])

  const handleReset = () => {
    setOpen(false)
    setError('')
  }

  const handleModal = () => {
    setOpen(!open)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataObj = new FormData()

    formDataObj.append('name', data.name)
    formDataObj.append('locationId', data.locationId)

    try {
      const res = await fetch(`/api/branch/${data.id}`, {
        method: 'PUT',
        body: formDataObj
      })

      // const res = await axios.put('/api/categories', formDataObj)

      if (res.status == 200) {
        handleReset()
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Branch updated successfully!'
        }).then(() => {
          window.location.reload() // Refresh the page
        })
      }
    } catch (error) {
      console.error('Error updating Branch:', error)
      setError('Failed to update Branch. Please try again.')
    }
  }

  return (
    <>
      <i className='tabler-edit text-[22px] cursor-pointer' onClick={handleModal} />
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleReset}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <div>
          <div className='flex items-center justify-between plb-5 pli-6'>
            <Typography variant='h5'>Update Branch</Typography>
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
                value={data?.name}
                onChange={e =>
                  setData({
                    ...data,
                    name: e.target.value
                  })
                }
              />
              <CustomTextField
                label='Location  '
                select
                fullWidth
                id='select-Location'
                value={data?.locationId}
                onChange={e =>
                  setData({
                    ...data,
                    locationId: e.target.value
                  })
                }
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
                {locations.map(location => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.markName}
                  </MenuItem>
                ))}
              </CustomTextField>
              {/* Error message */}
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
        </div>
      </Drawer>
    </>
  )
}

export default UpdateBranch
