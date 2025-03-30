import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="xl" sx={{ flex: 1, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={9}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Layout;
