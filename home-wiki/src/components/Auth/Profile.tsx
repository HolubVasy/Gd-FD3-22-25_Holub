import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useAuth } from '#/hooks/useAuth';
import { storage } from '#/services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Profile: React.FC = () => {
  const { user, isAuthenticated, loading, updateUserProfile, logout } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setFormChanged(true);
    }
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
    setFormChanged(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let photoURL = user?.photoURL;

    if (avatarFile) {
      try {
        setUploadingImage(true);

        // Create a unique file name
        const fileName = `avatars/${user?.id}_${new Date().getTime()}`;
        const storageRef = ref(storage, fileName);

        // Upload the file
        await uploadBytes(storageRef, avatarFile);

        // Get download URL
        photoURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Error uploading avatar:', error);
      } finally {
        setUploadingImage(false);
      }
    }

    await updateUserProfile(displayName, photoURL || undefined);
    setFormChanged(false);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5">Please sign in to view your profile</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 'calc(100vh - 64px)',
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ maxWidth: 600, width: '100%', p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Profile
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar
            src={avatarPreview || user?.photoURL || ''}
            alt={user?.displayName || 'User avatar'}
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="avatar-upload">
              <Button variant="outlined" component="span">
                Change Avatar
              </Button>
            </label>
          </Box>

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={user?.email || ''}
            disabled
          />

          <TextField
            label="Display Name"
            type="text"
            fullWidth
            margin="normal"
            value={displayName}
            onChange={handleDisplayNameChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading || uploadingImage || !formChanged}
            sx={{ mt: 3 }}
          >
            {loading || uploadingImage ? <CircularProgress size={24} /> : 'Update Profile'}
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Button variant="outlined" color="secondary" onClick={logout} disabled={loading}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
