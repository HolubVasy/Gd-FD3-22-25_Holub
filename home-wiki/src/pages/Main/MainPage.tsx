import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const MainPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Home Wiki
        </Typography>
        
        <Typography variant="body1" paragraph>
          This is an internal wiki project for families that will collect all the necessary information 
          for home maintenance and care. In this wiki, we collect instructions for maintaining household 
          appliances so that it would be clear to every family member how to properly use and maintain devices.
        </Typography>

        <Typography variant="body1" paragraph>
          The project includes sections on:
        </Typography>

        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li">
            Plants and gardening - from planting to caring for indoor plants and garden maintenance
          </Typography>
          <Typography component="li">
            Household appliance maintenance and care instructions
          </Typography>
          <Typography component="li">
            Home decoration and interior design tips
          </Typography>
          <Typography component="li">
            Cleaning and organization guides
          </Typography>
          <Typography component="li">
            Family event planning and organization
          </Typography>
          <Typography component="li">
            Home repair and maintenance guides
          </Typography>
        </Box>

        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          All information is organized with categories and tags for easy navigation. You can browse 
          articles by category or search for specific topics using tags. Each article provides clear, 
          step-by-step instructions with photos and diagrams where necessary.
        </Typography>

        <Typography variant="body1">
          Start exploring by selecting a category from the sidebar or using the search function to 
          find specific information.
        </Typography>
      </Paper>
    </Container>
  );
};

export default MainPage; 