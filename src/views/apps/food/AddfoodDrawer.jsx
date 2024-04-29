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

const AddUserDrawer = ({ open, handleClose }) => {
  const initialData = {
    name: '',
    price: '',
    description: '',
    image: '',
    categoryId: ''
  }

  const [formData, setFormData] = useState(initialData)

  const handleSubmit = async e => {
    e.preventDefault()
    handleClose(false)
    try {
      const response = await fetch('http://localhost:3000/api/apps/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Product created successfully:', data)
        // Reset the form
        setFormData(initialData)
      } else {
        const errorData = await response.json()
        console.error('Error:', errorData.error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleReset = () => {
    handleClose(false)
    setFormData(initialData)
  }
  // const [imgSrc, setImgSrc] = useState('/images/pages/profile-banner.png')

  // const handleImageInputChange = event => {
  //   const file = event.target.files[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onload = () => {
  //       setImgSrc(reader.result)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

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
        <Typography variant='h5'>Add New Food</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField label='Name' type='text' name='name' value={formData.name} onChange={handleChange} />
          <CustomTextField label='Price' type='number' name='price' value={formData.price} onChange={handleChange} />
          <CustomTextField
            label='Description'
            type='text'
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
          <CustomTextField label='Image' type='text' name='image' value={formData.image} onChange={handleChange} />
          <CustomTextField
            label='Category ID'
            type='text'
            name='categoryId'
            value={formData.categoryId}
            onChange={handleChange}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
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
