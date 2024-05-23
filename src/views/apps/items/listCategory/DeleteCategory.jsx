<<<<<<< HEAD
import { useState, useEffect } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

const DeleteCategory = ({ category }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(category);
  }, [category]);

  const handleReset = () => {
    setOpen(false);
    setError('');
  };

  const handleModal = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
=======
import { useState, useEffect } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'

const DeleteCategory = ({ category }) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(category)
  }, [category])

  const handleReset = () => {
    setOpen(false)
    setError('')
  }

  const handleModal = () => {
    setOpen(!open)
  }

  const handleSubmit = async e => {
    e.preventDefault()
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7

    try {
      const res = await fetch(`/api/categories/${data.id}`, {
        method: 'DELETE'
<<<<<<< HEAD
      });

      if (res.status === 200) {
        handleReset();
=======
      })

      if (res.status === 200) {
        handleReset()
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Category deleted successfully!'
<<<<<<< HEAD
        });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category. Please try again.');
    }
  };
=======
        }).then(() => {
          window.location.reload() // Refresh the page
        })
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      setError('Failed to delete category. Please try again.')
    }
  }
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7

  return (
    <>
      <i className='tabler-trash text-[22px] text-textSecondary cursor-pointer' onClick={handleModal} />
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
            <Typography variant='h5'>Delete Category</Typography>
            <IconButton onClick={handleReset}>
              <i className='tabler-x text-textPrimary' />
            </IconButton>
          </div>
          <Divider />
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
<<<<<<< HEAD
            <p>Are you sure you want to delete this {data?.name}?</p>
=======
              <p>Are you sure you want to delete this {data?.name}?</p>
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
              <div className='flex items-center gap-4'>
                <Button variant='contained' type='submit'>
                  Delete
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
<<<<<<< HEAD
  );
};

export default DeleteCategory;
=======
  )
}

export default DeleteCategory
>>>>>>> 7fc15d58a2ab3c1df7d717c3aa5d2e5e86839dc7
