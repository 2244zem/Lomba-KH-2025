// frontend/src/features/profilPengguna/components/ProfilePictureUpload.jsx
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { updateProfilePicture } from '../profilSlice';

const ProfilePictureUpload = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.profil);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);
      
      dispatch(updateProfilePicture(formData));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        src={user?.foto_profil || ''}
        sx={{ 
          width: 120, 
          height: 120, 
          mb: 2,
          fontSize: '2rem'
        }}
      >
        {user?.nama?.charAt(0) || 'U'}
      </Avatar>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <Button
        variant="outlined"
        startIcon={loading ? <CircularProgress size={20} /> : <PhotoCamera />}
        onClick={handleButtonClick}
        disabled={loading}
      >
        {loading ? 'Mengupload...' : 'Ubah Foto'}
      </Button>

      <Typography variant="caption" color="textSecondary" mt={1}>
        PNG, JPG maks. 5MB
      </Typography>
    </Box>
  );
};

export default ProfilePictureUpload;