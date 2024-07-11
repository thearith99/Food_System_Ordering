import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CustomTextField from '@core/components/mui/TextField'; // Adjust this import path as needed

const UpdateLocation = ({ location, markName, lat, long, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    markName: '',
    lat: '',
    long: '',
  });

  useEffect(() => {
    setFormData({
      markName: markName || '',
      lat: lat || '',
      long: long || '',
    });
  }, [location, markName, lat, long]);

  const handleReset = () => {
    setOpen(false);
    setError('');
    setFormData({
      markName: markName || '',
      lat: lat || '',
      long: long || '',
    });
  };

  const handleModal = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedLocation = {
      id: location,
      markName: formData.markName,
      lat: parseFloat(formData.lat),
      long: parseFloat(formData.long),
    };

    try {
      const res = await fetch(`/api/locations/${location}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLocation),
      });

      const data = await res.json();

      if (res.ok) {
        // onUpdate(updatedLocation);  // Ensure this is correctly passed and is a function
        handleReset();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Location updated successfully!',
        }).then(() => {
          window.location.reload();
        });
      } else {
        throw new Error(data.message || 'Failed to update location');
      }
    } catch (error) {
      setError(error.message || 'Failed to update location. Please try again.');
    }
  };

  return (
    <>
      <i className='tabler-edit text-[22px] text-textSecondary cursor-pointer' onClick={handleModal} />
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
            <Typography variant='h5'>Update Location</Typography>
            <IconButton onClick={handleReset}>
              <i className='tabler-x text-textPrimary' />
            </IconButton>
          </div>
          <Divider />
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
              <CustomTextField
                label='Mark Name'
                fullWidth
                value={formData.markName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    markName: e.target.value,
                  })
                }
              />
              <CustomTextField
                label='Lat'
                fullWidth
                value={formData.lat}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lat: e.target.value,
                  })
                }
              />
              <CustomTextField
                label='Long'
                fullWidth
                value={formData.long}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    long: e.target.value,
                  })
                }
              />
              {error && (
                <Typography variant='body2' color='error'>
                  {error}
                </Typography>
              )}
              <div className='flex items-center gap-4'>
                <Button variant='contained' type='submit'>
                  Submit
                </Button>
                <Button variant='tonal' color='error' type='button' onClick={handleReset}>
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

export default UpdateLocation;

