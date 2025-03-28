// src/pages/Categories.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { Category } from '../types/models';
import { CategoryService } from '../api/CategoryService';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    CategoryService.getCategories()
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Категории
      </Typography>
      <List>
        {categories.map((cat) => (
          <ListItem key={cat.id} button component={Link} to={`/categories/${cat.id}`}>
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Categories;
