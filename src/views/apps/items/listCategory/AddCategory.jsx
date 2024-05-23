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
<<<<<<< HEAD
  const [parentId, setParentId] = useState('')
=======
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null) // Reset error state on component mount
  }, [open]) // Reset error state when the drawer opens or closes

  const handleSubmit = async e => {
    e.preventDefault()

    const formDataObj = new FormData()

    formDataObj.append('name', nameCategory)
    formDataObj.append('image', imageCategory)
<<<<<<< HEAD
    formDataObj.append('parentId', parentId)
=======
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7

    try {
      await axios.post('/api/categories', formDataObj)
      handleClose()
      setNameCategory('')
      setImageCategory('')
<<<<<<< HEAD
      setParentId('')
=======
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data submitted successfully!'
<<<<<<< HEAD
      })
    } catch (error) {
      // console.error('Error submitting form:', error);
      setError('Failed to submit data. Please try again.');
=======
      }).then(() => {
        window.location.reload() // Refresh the page
      })
    } catch (error) {
      // console.error('Error submitting form:', error);
      setError('Failed to submit data. Please try again.')
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
    }
  }

  const handleReset = () => {
    handleClose()
    setNameCategory('')
    setImageCategory('')
<<<<<<< HEAD
    setParentId('')
=======
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
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
<<<<<<< HEAD
          {/* Parent ID Input */}
          <CustomTextField label='Parent ID' fullWidth value={parentId} onChange={e => setParentId(e.target.value)} />
          {/* Error Message */}
=======
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
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
