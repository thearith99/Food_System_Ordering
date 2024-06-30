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
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@core/components/mui/TextField'

const UpdateBranch = ({ product, BranchId }) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({})
  // const [productId, setProductId] = useState('')
  const [products, setProducts] = useState([])
  const [branchproducts, setbranchProducts] = useState([])
  // const [discountId, setDiscountId] = useState('')
  const [discount, setDiscount] = useState([])
  const [branchdiscount, setbranchDiscount] = useState([])
  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/branchProduct')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])
  useEffect(() => {
    setbranchProducts(products.filter(product => String(product.branchId) === String(BranchId)))
  }, [products, BranchId])
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get(`/api/discount`) // Adjust the URL as needed
        setDiscount(response.data)
      } catch (error) {
        console.error('Error fetching discount:', error)
      }
    }
    fetchDiscount()
  }, [])
  useEffect(() => {
    setbranchDiscount(discount.filter(dis => String(dis.branchId) === String(BranchId)))
  }, [discount, BranchId])
  const handleReset = () => {
    setOpen(false)
    setError('')
  }
  useEffect(() => {
    setData(product)
  }, [product])
  const handleModal = () => {
    setOpen(!open)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataObj = new FormData()
    formDataObj.append('productId', parseInt(data.productId))
    formDataObj.append('discountId', parseInt(data.discountId))

    try {
      const res = await fetch(`/api/ProductDiscount/${data.id}`, {
        method: 'PUT',
        body: formDataObj
      })

      if (res.status == 200) {
        handleReset()
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product Discount updated successfully!'
        }).then(() => {
          window.location.reload() // Refresh the page
        })
      }
    } catch (error) {
      console.error('Error updating Discount:', error)
      setError('Failed to update Product Discount. Please try again.')
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
            <Typography variant='h5'>Update Discount</Typography>
            <IconButton onClick={handleReset}>
              <i className='tabler-x text-textPrimary' />
            </IconButton>
          </div>
          <Divider />
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
              <FormControl fullWidth>
                <CustomTextField
                  labelId='product-label'
                  value={data?.productId}
                  label='Product'
                  select
                  onChange={e => setData({ ...data, productId: e.target.value })}
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
                  {branchproducts.map(product => (
                    <MenuItem key={product.id} value={product.productId}>
                      {product.product.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </FormControl>
              <FormControl fullWidth>
                <CustomTextField
                  labelId='discount-label'
                  value={data?.discountId}
                  label='Discount'
                  select
                  onChange={e => setData({ ...data, discountId: e.target.value })}
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
                  {branchdiscount.map(dis => (
                    <MenuItem key={dis.id} value={dis.id}>
                      {dis.amount}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </FormControl>
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
