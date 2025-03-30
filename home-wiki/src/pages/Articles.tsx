import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, CircularProgress, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchArticles } from '../redux/slices/articleSlice';
import { Link } from 'react-router-dom';

const Articles: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(state => state.articles);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filtered = list.filter(art => art.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Список статей
      </Typography>

      <TextField
        label="Поиск по названию"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mt: 2, mb: 2 }}
        fullWidth
      />

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {filtered.map(article => (
        <Box key={article.id} sx={{ mb: 2 }}>
          <Typography variant="h6">
            <Link to={`/articles/${article.id}`}>{article.name}</Link>
          </Typography>
          <Typography variant="body2">{article.description}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default Articles;
