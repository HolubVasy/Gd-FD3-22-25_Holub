import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Divider sx={{ mb: 3 }} />
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: { xs: 'center', sm: 'flex-start' },
              mb: { xs: 2, sm: 0 },
            }}
          >
            <Typography variant="h6" color="text.primary" gutterBottom>
              HomeWiki
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your personal knowledge base
            </Typography>
            <Typography variant="body2" color="text.secondary">
              &copy; {currentYear} HomeWiki. All rights reserved.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 4 },
              alignItems: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                Navigation
              </Typography>
              <Link component={RouterLink} to="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link component={RouterLink} to="/categories" color="inherit" underline="hover">
                Categories
              </Link>
              <Link component={RouterLink} to="/articles" color="inherit" underline="hover">
                Articles
              </Link>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                Account
              </Typography>
              <Link component={RouterLink} to="/auth/login" color="inherit" underline="hover">
                Login
              </Link>
              <Link component={RouterLink} to="/auth/register" color="inherit" underline="hover">
                Register
              </Link>
              <Link component={RouterLink} to="/profile" color="inherit" underline="hover">
                Profile
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 