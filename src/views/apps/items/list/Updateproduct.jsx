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
import MenuItem from '@mui/material/MenuItem'

import Divider from '@mui/material/Divider'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import CustomTextField from '@core/components/mui/TextField'

const Updateproduct = ({ product }) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [categories, setCategories] = useState([])

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

  useEffect(() => {
    setData(product)
  }, [product])

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
    formDataObj.append('image', data.image)
    formDataObj.append('categoryId', data.categoryId)
    formDataObj.append('price', data.price)
    formDataObj.append('description', data.description)

    try {
      const res = await fetch(`/api/products/${data.id}`, {
        method: 'PUT',
        body: formDataObj
      })

      // const res = await axios.put('/api/categories', formDataObj)

      if (res.status == 200) {
        handleReset()
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product updated successfully!'
        }).then(() => {
          window.location.reload() // Refresh the page
        })
      }
    } catch (error) {
      console.error('Error updating Product:', error)
      setError('Failed to update Product. Please try again.')
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
            <Typography variant='h5'>Update Category</Typography>
            <IconButton onClick={handleReset}>
              <i className='tabler-x text-textPrimary' />
            </IconButton>
          </div>
          <Divider />
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
              {/* Category Name Input */}
              <CustomTextField
                label='Category Name'
                fullWidth
                value={data?.name}
                onChange={e =>
                  setData({
                    ...data,
                    name: e.target.value
                  })
                }
              />
              {/* Category Image Input */}
              {imageUrl ? (
                <img src={imageUrl} width={50} height={50} />
              ) : (
                <img src={`http://localhost:3000/images/${data?.image}.jpg`} width={50} height={50} />
              )}

              <CustomTextField
                type='file'
                label='Category Image'
                fullWidth
                onChange={e => {
                  const selectedImage = e.target.files[0]

                  setData({
                    ...data,
                    image: selectedImage
                  }),
                    setImageUrl(URL.createObjectURL(selectedImage))
                }}
              />
              {/* Parent ID Input */}
              <FormControl fullWidth>
                <InputLabel id='category-label'>Category Name</InputLabel>
                <Select
                  labelId='category-label'
                  value={data?.categoryId}
                  label='Category'
                  onChange={e =>
                    setData({
                      ...data,
                      categoryId: e.target.value
                    })
                  }
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <CustomTextField
                label='price'
                fullWidth
                value={data?.price}
                onChange={e =>
                  setData({
                    ...data,
                    price: e.target.value
                  })
                }
              />
              <CustomTextField
                label='description'
                fullWidth
                value={data?.description}
                onChange={e =>
                  setData({
                    ...data,
                    description: e.target.value
                  })
                }
              />
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

export default Updateproduct
