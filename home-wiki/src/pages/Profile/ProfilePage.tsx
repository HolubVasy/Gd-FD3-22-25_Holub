import React from 'react';
import { Container, Box } from '@mui/material';
import Profile from '../../components/Auth/Profile';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Profile />
      </Box>
    </Container>
  );
};

export default ProfilePage;
