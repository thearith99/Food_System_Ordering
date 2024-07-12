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

// Vars

const AddUserDrawer = ({ open, handleClose, BranchId }) => {
  const Available = 'Available'
  const Unavailable = 'Unavailable'

  const [price, setPrice] = useState('')
  const [status, setStatus] = useState('')

  const [productId, setproductId] = useState('')
  const [products, setproducts] = useState([])
  const [branchName, setBranchName] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null) // Reset error state on component mount
  }, [open]) // Reset error state when the drawer opens or closes

  useEffect(() => {
    // Fetch products from API
    const fetchproducts = async () => {
      try {
        const response = await axios.get('/api/products')
        setproducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchproducts()
  }, [])
  useEffect(() => {
    const fetchBranchName = async () => {
      try {
        const response = await axios.get(`/api/branch/${BranchId}`) // Adjust the URL as needed
        setBranchName(response.data.branch.name)
        console.log('Fetched branch name:', response.data.branch.name)
      } catch (error) {
        console.error('Error fetching branch name:', error)
      }
    }
    fetchBranchName()
  }, [BranchId])

  const getproductIdByname = name => {
    const product = products.find(product => product.name === name)
    return product ? product.id : ''
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataObj = new FormData()
    formDataObj.append('price', price)
    formDataObj.append('status', status)
    formDataObj.append('productId', getproductIdByname(productId))
    formDataObj.append('branchId', parseInt(BranchId))

    try {
      const response = await axios.post('/api/branchProduct', formDataObj)

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
      setPrice('')
      setStatus('')
      setproductId('')
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
    setPrice('')
    setStatus('')
    setproductId('')
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
        <Typography variant='h5'>Add New Branch Product</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <Typography variant='body1'>Branch: {branchName}</Typography>
          <FormControl fullWidth>
            <CustomTextField
              labelId='product-label'
              value={productId}
              label='Product'
              select
              onChange={e => setproductId(e.target.value)}
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
              {products.map(product => (
                <MenuItem key={product.id} value={product.name}>
                  {product.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </FormControl>
          <CustomTextField label='Price' fullWidth value={price} onChange={e => setPrice(e.target.value)} />
          <FormControl fullWidth>
            <CustomTextField
              labelId='product-label'
              value={status}
              label='Status'
              select
              onChange={e => setStatus(e.target.value)}
            >
              <MenuItem value={Available}>{Available}</MenuItem>
              <MenuItem value={Unavailable}>{Unavailable}</MenuItem>
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

export default AddUserDrawer
