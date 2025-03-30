import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Sidebar from '../Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, py: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: '250px 1fr',
            gap: 3,
          }}>
            <Box>
              <Sidebar />
            </Box>
            <Box sx={{ 
              backgroundColor: 'white',
              borderRadius: 1,
              p: 3,
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
            }}>
              {children}
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
