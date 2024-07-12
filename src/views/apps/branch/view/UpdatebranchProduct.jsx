'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

import CustomTextField from '@core/components/mui/TextField'

const UpdateBranch = ({ branchProduct }) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({})
  const [products, setproducts] = useState([])
  const [branchs, setbranchs] = useState([])
  const Available = 'Available'
  const Unavailable = 'Unavailable'
  useEffect(() => {
    fetchbranchs()
    fetchproducts()
  }, [])

  const fetchproducts = async () => {
    try {
      const response = await axios.get('/api/branchProduct') // Adjust the URL as needed
      setproducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  const fetchbranchs = async () => {
    try {
      const response = await axios.get('/api/branch')
      setbranchs(response.data)
    } catch (error) {
      console.error('Error fetching branch:', error)
    }
  }
  useEffect(() => {
    setData(branchProduct)
  }, [branchProduct])

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

    formDataObj.append('price', data.price)
    formDataObj.append('status', data.status)
    formDataObj.append('productId', data.productId)
    formDataObj.append('branchId', data.branchId)

    try {
      const res = await fetch(`/api/branchProduct/${data.id}`, {
        method: 'PUT',
        body: formDataObj
      })

      // const res = await axios.put('/api/categories', formDataObj)

      if (res.status == 200) {
        handleReset()
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Branch Product updated successfully!'
        }).then(() => {
          window.location.reload() // Refresh the page
        })
      }
    } catch (error) {
      console.error('Error updating Branch:', error)
      setError('Failed to update Branch Product. Please try again.')
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
            <Typography variant='h5'>Update Branch Product</Typography>
            <IconButton onClick={handleReset}>
              <i className='tabler-x text-textPrimary' />
            </IconButton>
          </div>
          <Divider />
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
              <CustomTextField
                label='Product ID Name'
                select
                fullWidth
                disabled
                id='select-Location'
                value={data?.productId}
                onChange={e =>
                  setData({
                    ...data,
                    productId: e.target.value
                  })
                }
              >
                {products.map(product => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.product}
                  </MenuItem>
                ))}
              </CustomTextField>

              <CustomTextField
                label='Branch Name '
                select
                fullWidth
                disabled
                id='select-branch'
                value={data?.branchId}
                onChange={e =>
                  setData({
                    ...data,
                    branchId: e.target.value
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
                {branchs.map(branch => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </CustomTextField>
              <CustomTextField
                label='Price'
                fullWidth
                value={data?.price}
                onChange={e =>
                  setData({
                    ...data,
                    price: e.target.value
                  })
                }
              />
              <FormControl fullWidth>
                <CustomTextField
                  labelId='product-label'
                  value={data?.status}
                  label='Status'
                  select
                  onChange={e =>
                    setData({
                      ...data,
                      status: e.target.value
                    })
                  }
                >
                  <MenuItem value={Available}>{Available}</MenuItem>
                  <MenuItem value={Unavailable}>{Unavailable}</MenuItem>
                </CustomTextField>
              </FormControl>
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
