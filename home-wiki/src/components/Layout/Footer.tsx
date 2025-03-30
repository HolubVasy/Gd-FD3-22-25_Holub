import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#607d8b',
        color: 'white',
        py: 2
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex',
          gap: 4
        }}>
          {/* Documents section */}
          <Box>
            <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Documents</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link 
                component={RouterLink} 
                to="/articles" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Article
              </Link>
              <Link 
                component={RouterLink} 
                to="/categories" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Category
              </Link>
              <Link 
                component={RouterLink} 
                to="/tags" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Tag
              </Link>
            </Box>
          </Box>

          {/* Infor section */}
          <Box>
            <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Infor</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link 
                component={RouterLink} 
                to="/" 
                sx={{ 
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Main
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Bottom section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          pt: 2,
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link 
              component={RouterLink} 
              to="/contact" 
              sx={{ 
                color: 'white', 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Contact us
            </Link>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              sx={{ 
                color: 'white', 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Privacy & cookies
            </Link>
            <Link 
              component={RouterLink} 
              to="/terms" 
              sx={{ 
                color: 'white', 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Terms of use
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography>2025 Vasili Holub</Typography>
            <Link 
              component={RouterLink} 
              to="/language" 
              sx={{ 
                color: 'white', 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              <span>🌐</span>
              English
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
