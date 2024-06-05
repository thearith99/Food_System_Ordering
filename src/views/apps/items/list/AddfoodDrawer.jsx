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
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars

const AddUserDrawer = ({ open, handleClose }) => {
  const [nameProduct, setNameProduct] = useState('')
  const [imageProduct, setImageProduct] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null) // Reset error state on component mount
  }, [open]) // Reset error state when the drawer opens or closes

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories')

        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const getCategoryIdByName = name => {
    const category = categories.find(category => category.name === name)

    return category ? category.id : ''
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataObj = new FormData()

    formDataObj.append('name', nameProduct)
    formDataObj.append('image', imageProduct)
    formDataObj.append('categoryId', getCategoryIdByName(categoryId))
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
      }).then(() => {
        window.location.reload() // Refresh the page
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
          <FormControl fullWidth>
            <InputLabel id='category-label'>Category Name</InputLabel>
            <Select
              labelId='category-label'
              value={categoryId}
              label='Category'
              onChange={e => setCategoryId(e.target.value)}
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
