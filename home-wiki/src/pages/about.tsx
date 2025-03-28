// src/pages/About.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        О нашем приложении
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Домашнее вики.
      </Typography>
    </Container>
  );
};

export default About;
