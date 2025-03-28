import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { useCategories } from '../../hooks/useCategories';
import { Category } from '../../types/models';

const Categories: React.FC = () => {
  const { categories: list, loading, error, createCategory, fetchCategories } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreate = () => {
    createCategory(newCategoryName);
    setNewCategoryName('');
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Категории
      </Typography>
      {loading && <div>Loading...</div>}
      {error && <Typography color="error">{error}</Typography>}

      <Box sx={{ mt: 2 }}>
        <TextField
          label="Новая категория"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreate} sx={{ ml: 2 }}>
          Создать
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        {list.map((cat: Category) => (
          <Typography key={cat.id} variant="body1">
            {cat.name}
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default Categories;
