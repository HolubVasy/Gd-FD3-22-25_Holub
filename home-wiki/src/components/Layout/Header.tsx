import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#607d8b',
        color: 'white',
        boxShadow: 'none'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ 
                color: 'white',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Main
            </Button>
            <Button
              component={RouterLink}
              to="/documents"
              sx={{ 
                color: 'white',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Documents
            </Button>
            <Button
              component={RouterLink}
              to="/articles"
              sx={{ 
                color: 'white',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Article
            </Button>
            <Button
              component={RouterLink}
              to="/categories"
              sx={{ 
                color: 'white',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Category
            </Button>
            <Button
              component={RouterLink}
              to="/tags"
              sx={{ 
                color: 'white',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Tag
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
