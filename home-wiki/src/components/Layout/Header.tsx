import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          Home wiki
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
          >
            Main
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/articles"
          >
            Articles
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/categories"
          >
            Categories
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/tags"
          >
            Tags
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
