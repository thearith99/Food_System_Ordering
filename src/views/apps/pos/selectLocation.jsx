'use client'

import React, { useContext, useEffect, useState } from 'react';

import {
  Modal,
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';

import homeContext from '@/contexts/home.context'
import CustomTextField from '@core/components/mui/TextField'
import { useStorage } from '@/hooks/useHook'


const SelectLocation = ({ open, handleClose }) => {
  const {
    state: { locations },
    dispatch
  } = useContext(homeContext);

  const [selectLocat, setSelectLocat] = useStorage('selectedLocation', null);

  useEffect(() => {
    if (selectLocat) {
      const location = locations.find(loc => loc.id === selectLocat);

      dispatch({
        field: 'selectedLocation',
        value: location
      });
    }
  }, [selectLocat, locations, dispatch]);

  const handleReset = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleReset}
      aria-labelledby="add-user-modal-title"
      aria-describedby="add-user-modal-description"
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
        <div className="flex items-center justify-between pb-2">
          <Typography id="add-user-modal-title" variant="h5">
            Select Location
          </Typography>
          <IconButton onClick={handleReset}>
            <i className="tabler-x text-textPrimary" />
          </IconButton>
        </div>
        <Divider />
        <div>
          <FormControl fullWidth>
            <InputLabel id="location-label">Select Location</InputLabel>
            <Select
              labelId="location-label"
              value={selectLocat}
              onChange={e => {
                setSelectLocat(e.target.value);
                const location = locations.find(loc => loc.id === e.target.value);

                dispatch({
                  field: 'selectedLocation',
                  value: location
                });
              }}
            >
              {locations.length > 0 &&
                locations.map(loc => (
                  <MenuItem key={loc.id} value={loc.id}>
                    {loc.markName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </Box>
    </Modal>
  );
};

export default SelectLocation;
