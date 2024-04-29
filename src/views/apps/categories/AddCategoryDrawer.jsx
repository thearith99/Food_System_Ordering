'use client'
// React Imports
import { useState } from 'react'
// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars
const initialData = {
  name: '',
  image: '',
  productId: ''
}

const AddUserDrawer = ({ open, handleClose }) => {
  // States
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = async event => {
    event.preventDefault()
    handleClose()
    setFormData(initialData)

    try {
      const response = await fetch('/api/apps/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const category = await response.json()
        console.log('Category created:', category)
        // Perform any further actions or display success message
      } else {
        console.error('Failed to create category:', response.statusText)
        // Display error message or handle the error appropriately
      }
    } catch (error) {
      console.error('An error occurred:', error)
      // Display error message or handle the error appropriately
    }
  }

  const handleReset = () => {
    handleClose()
    setFormData({
      tittle: '',
      image: '',
      status: ''
    })
    setImgSrc('/images/pages/profile-banner.png')
  }
  const [imgSrc, setImgSrc] = useState('/images/pages/profile-banner.png')

  const handleImageInputChange = event => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(file)
    }
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
        <Typography variant='h5'>Add New Category</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <br />

          <label htmlFor='image'>Image:</label>
          <input
            type='text'
            id='parentId'
            value={formData.image}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
            required
          />
          <br />

          <label htmlFor='parentId'>Parent ID:</label>
          <input
            type='text'
            id='parentId'
            value={formData.parentId}
            onChange={e => setFormData({ ...formData, parentId: e.target.value })}
            required
          />
          <br />
          <div className='flex items-center gap-4'>
            <input type='submit' value='Create Category' />
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
