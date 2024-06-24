'use client'

import { useState, useContext } from 'react';

import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import homeContext from '@/contexts/home.context';
import CustomTextField from '@core/components/mui/TextField';

const AddUser = ({ open, handleClose }) => {
  const {
    state: { users, addusers },
    dispatch
  } = useContext(homeContext);

  const [selectedUser, setSelectedUser] = useState(''); // State to store the selected user
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      phone,
      password
    };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit data. Please try again.');
      }

      handleClose();
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setSelectedUser(''); // Reset selected user after submission
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User added successfully!'
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReset = () => {
    handleClose();
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setSelectedUser(''); // Reset selected user on cancel
  };

  return (
    <Modal
      open={open}
      onClose={handleReset}
      aria-labelledby='add-user-modal-title'
      aria-describedby='add-user-modal-description'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300 // Ensure this is higher than the search bar
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '70%', md: '50%' },
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 1,
          boxShadow: 10
        }}
      >
        <div className='flex items-center justify-between pb-2'>
          <Typography id='add-user-modal-title' variant='h5'>
            Select Customer
          </Typography>
          <IconButton onClick={handleReset}>
            <i className='tabler-x text-textPrimary' />
          </IconButton>
        </div>
        <Divider />
        <div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6 pt-4'>
            {/* Dropdown to select user */}
            <FormControl fullWidth>
              <InputLabel id='customer-label'>Select Customer</InputLabel>
              <Select
                labelId='customer-label'
                value={selectedUser}
                onChange={(e) => {
                  const user = users.find(user => user.id === e.target.value);

                  setSelectedUser(e.target.value);
                  console.log('Selected user:', user);
                  dispatch({
                    field: 'addusers',
                    value: user
                  });
                }}
              >
                {/* <MenuItem value="">Select...</MenuItem> */}
                {users.length > 0 && users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography id='add-user-modal-title' variant='h5'>
              Add Customer
            </Typography>
            {/* Name Input */}
            <CustomTextField label='Name' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            {/* Email Input */}
            <CustomTextField label='Email' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            {/* Phone Input */}
            <CustomTextField label='Phone' fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
            {/* Password Input */}
            <CustomTextField
              label='Password'
              type='password'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
      </Box>
    </Modal>
  );
};

export default AddUser;
