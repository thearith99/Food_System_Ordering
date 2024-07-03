'use client'
import { useState, useEffect } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'

import CustomTextField from '@core/components/mui/TextField'

const AddCategory = ({ open, handleClose }) => {
  const [nameCategory, setNameCategory] = useState('')
  const [imageCategory, setImageCategory] = useState('')
  const [parentId, setParentId] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null) // Reset error state on component mount
  }, [open]) // Reset error state when the drawer opens or closes

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataObj = new FormData()

    formDataObj.append('name', nameCategory)
    formDataObj.append('image', imageCategory)
    formDataObj.append('parentId', parentId)

    try {
      await axios.post('/api/categories', formDataObj)
      handleClose()
      setNameCategory('')
      setImageCategory('')
      setParentId('')
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data submitted successfully!'
      }).then(() => {
        window.location.reload() // Refresh the page
      })
    } catch (error) {
      // console.error('Error submitting form:', error);
      setError('Failed to submit data. Please try again.');
    }
  }

  const handleReset = () => {
    handleClose()
    setNameCategory('')
    setImageCategory('')
    setParentId('')
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
        <Typography variant='h5'>Add New Category</Typography>
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
            value={nameCategory}
            onChange={e => setNameCategory(e.target.value)}
          />
          {/* Category Image Input */}
          <CustomTextField
            type='file'
            label='Category Image'
            fullWidth
            onChange={e => setImageCategory(e.target.files[0])}
          />
          {/* Parent ID Input */}
          <CustomTextField label='Parent ID' fullWidth value={parentId} onChange={e => setParentId(e.target.value)} />
          {/* Error Message */}
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
    </Drawer>
  )
}

export default AddCategory
