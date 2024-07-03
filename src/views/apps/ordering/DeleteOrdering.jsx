import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

const DeleteOrdering = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(order);
  }, [order]);

  const handleReset = () => {
    setOpen(false);
    setError('');
  };

  const handleModal = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/orders/${order}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        handleReset();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Order deleted successfully!'
        }).then(() => {
          window.location.reload() // Refresh the page
        });
      } else {
        throw new Error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      setError('Failed to delete order. Please try again.');
    }
  };

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
            <Typography variant='h5'>Delete Order</Typography>
            <IconButton onClick={handleReset}>
              <i className='tabler-x text-textPrimary' />
            </IconButton>
          </div>
          <Divider />
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
              <p>Are you sure you want to delete this order with ID {data?.id}?</p>
              {error && <Typography variant="body2" color="error">{error}</Typography>}
              <div className='flex items-center gap-4'>
                <Button variant='contained' type='submit'>
                  Delete
                </Button>
                <Button variant='outlined' color='secondary' type='button' onClick={handleReset}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DeleteOrdering;
