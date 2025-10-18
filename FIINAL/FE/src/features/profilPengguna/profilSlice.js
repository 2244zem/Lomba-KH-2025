// frontend/src/features/profilPengguna/profilSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'profil/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/user/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat profil');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'profil/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/user/profile', profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui profil');
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  'profil/updateProfilePicture',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/user/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal mengubah foto profil');
    }
  }
);

export const changePassword = createAsyncThunk(
  'profil/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/user/change-password', passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal mengubah password');
    }
  }
);

const profilSlice = createSlice({
  name: 'profil',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Update Profile Picture
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.success = true;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess } = profilSlice.actions;
export default profilSlice.reducer;