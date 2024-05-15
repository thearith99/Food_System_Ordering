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

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars

const AddUserDrawer = ({ open, handleClose }) => {
  const [nameProduct, setNameProduct] = useState('')
  const [imageProduct, setImageProduct] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null) // Reset error state on component mount
  }, [open]) // Reset error state when the drawer opens or closes

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataObj = new FormData()

    formDataObj.append('name', nameProduct)
    formDataObj.append('image', imageProduct)
    formDataObj.append('categoryId', categoryId)
    formDataObj.append('price', price)
    formDataObj.append('description', description)

    try {
      await axios.post('/api/products', formDataObj)
      handleClose()
      setNameProduct('')
      setImageProduct('')
      setCategoryId('')
      setDescription('')
      setPrice('')
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data submitted successfully!'
      })
    } catch (error) {
      // console.error('Error submitting form:', error);
      setError('Failed to submit data. Please try again.')
    }
  }
  const handleReset = () => {
    handleClose()
    setNameProduct('')
    setImageProduct('')
    setCategoryId('')
    setDescription('')
    setPrice('')
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
        <Typography variant='h5'>Add New Food</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='Product Name'
            fullWidth
            value={nameProduct}
            onChange={e => setNameProduct(e.target.value)}
          />
          <CustomTextField
            type='file'
            label='Product Image'
            fullWidth
            onChange={e => setImageProduct(e.target.files[0])}
          />
          <CustomTextField label='Description' type='text' fullWidth onChange={e => setDescription(e.target.value)} />
          <CustomTextField label='Category ID' type='text' fullWidth onChange={e => setCategoryId(e.target.value)} />
          <CustomTextField label='Price' type='text' fullWidth onChange={e => setPrice(e.target.value)} />
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
