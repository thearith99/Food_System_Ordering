'use client'

// React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars

const AddUserDrawer = ({ open, handleClose, BranchId }) => {
  const [amount, setAmount] = useState('')
  const [branchName, setBranchName] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null) // Reset error state on component mount
  }, [open]) // Reset error state when the drawer opens or closes

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

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataObj = new FormData()
    formDataObj.append('amount', amount)
    formDataObj.append('branchId', parseInt(BranchId))

    try {
      const response = await axios.post('/api/discount', formDataObj)

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
      setAmount('')
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
    setAmount('')
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
        <Typography variant='h5'>Add New Discount</Typography>
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
              label='Discount Amount'
              fullWidth
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
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
