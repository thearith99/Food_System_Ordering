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

import CustomTextField from '@core/components/mui/TextField'

const Updateproduct = ({ product }) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({})
  const [imageUrl, setImageUrl] = useState(null)

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

    try {
      if (typeof data.image != 'object') {
        delete data.image
      }

      const res = await fetch(`/api/products/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
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
              <CustomTextField
                label='Category ID'
                fullWidth
                value={data?.categoryId}
                onChange={e =>
                  setData({
                    ...data,
                    categoryId: e.target.value
                  })
                }
              />
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
