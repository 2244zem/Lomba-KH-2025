// frontend/src/features/profilPengguna/components/PasswordChange.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Collapse
} from '@mui/material';
import { changePassword } from '../profilSlice';

const PasswordChange = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.profil);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Password saat ini harus diisi';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Password baru harus diisi';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password minimal 6 karakter';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(changePassword({
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirmation: formData.confirmPassword
      })).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        }
      });
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Ubah Password
      </Typography>

      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <Collapse in={success}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Password berhasil diubah!
        </Alert>
      </Collapse>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Password Saat Ini"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={handleChange}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password Baru"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Konfirmasi Password Baru"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Mengubah...' : 'Ubah Password'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PasswordChange;