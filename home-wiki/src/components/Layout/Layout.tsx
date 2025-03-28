import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pb: 4,
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
