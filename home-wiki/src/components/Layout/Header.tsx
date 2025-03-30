import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: '#1976d2',
        borderRadius: 0
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            flexGrow: 1
          }}
        >
          Home wiki
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/"
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Main
          </Button>
          <Button
            component={RouterLink}
            to="/articles"
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Articles
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
