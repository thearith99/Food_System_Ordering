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

import CustomTextField from '@core/components/mui/TextField'

const UpdateBranch = ({ discount }) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({})
  useEffect(() => {
    setData(discount)
  }, [discount])

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
    formDataObj.append('amount', data.amount)
    formDataObj.append('branchId', data.branchId)

    try {
      const res = await fetch(`/api/discount/${data.id}`, {
        method: 'PUT',
        body: formDataObj
      })

      if (res.status == 200) {
        handleReset()
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Discount updated successfully!'
        }).then(() => {
          window.location.reload() // Refresh the page
        })
      }
    } catch (error) {
      console.error('Error updating Discount:', error)
      setError('Failed to update Discount. Please try again.')
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
                  label='Discount Amount'
                  fullWidth
                  value={data?.amount}
                  onChange={e => setData({ ...data, amount: e.target.value })}
                />
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
