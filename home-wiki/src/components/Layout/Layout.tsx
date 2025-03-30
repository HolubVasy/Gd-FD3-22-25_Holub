import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Sidebar from '../Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, py: 3 }}>
        <Grid container>
          <Grid item xs={2}>
            <Box sx={{ 
              backgroundColor: 'white',
              borderRight: '1px solid #e0e0e0',
              position: 'fixed',
              width: '16.666%',
              overflowY: 'auto',
              top: '64px', // Header height
              bottom: '200px', // Footer height + some padding
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
              },
            }}>
              <Sidebar />
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Container maxWidth="xl" sx={{ 
              backgroundColor: 'white',
              borderRadius: 1,
              p: 3,
              ml: 2,
              mb: 3 // Add bottom margin
            }}>
              {children}
            </Container>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
