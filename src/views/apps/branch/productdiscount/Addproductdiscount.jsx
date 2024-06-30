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
import FormControl from '@mui/material/FormControl'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddProductDiscountDrawer = ({ open, handleClose, BranchId }) => {
  const [productId, setProductId] = useState('')
  const [products, setProducts] = useState([])
  const [branchproducts, setbranchProducts] = useState([])
  const [discountId, setDiscountId] = useState('')
  const [discount, setDiscount] = useState([])
  const [branchdiscount, setbranchDiscount] = useState([])

  const [error, setError] = useState(null)
  useEffect(() => {
    setError(null) // Reset error state on component mount
  }, [open]) // Reset error state when the drawer opens or closes

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

  const handleSubmit = async e => {
    e.preventDefault()
    const formDataObj = new FormData()
    formDataObj.append('productId', parseInt(productId))
    formDataObj.append('discountId', parseInt(discountId)) // Corrected to use discountId

    try {
      const response = await axios.post('/api/ProductDiscount', formDataObj)

      const { message, status } = response.data

      if (status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: message
        }).then(() => {
          window.location.reload() // Refresh the page
        })
      } else if (status === 409) {
        setError(message)
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: message
        })
      } else {
        setError(message)
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to submit data. Please try again.'
        })
      }

      handleClose()
      setProductId('')
      setDiscountId('')
    } catch (error) {
      setError('Failed to submit data. Please try again.')
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response ? error.response.data.message : 'Failed to submit data. Please try again.'
      })
    }
  }

  const handleReset = () => {
    handleClose()
    setProductId('')
    setDiscountId('')
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
        <Typography variant='h5'>Add New Product Discount</Typography>
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
              value={productId}
              label='Product'
              select
              onChange={e => setProductId(e.target.value)}
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
              value={discountId}
              label='Discount'
              select
              onChange={e => setDiscountId(e.target.value)}
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

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
          {error && <Typography color='error'>{error}</Typography>}
        </form>
      </div>
    </Drawer>
  )
}

export default AddProductDiscountDrawer
