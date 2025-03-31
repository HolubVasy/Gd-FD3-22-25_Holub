import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  Fab,
  Container,
  CircularProgress,
  Alert,
  Button,
  CardActions
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import { Category } from '#/types/models';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchCategories = async (pageNumber: number, search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchParam = search ? `name=${encodeURIComponent(search)}` : 'name=';
      const response = await axios.get(`${API_BASE_URL}/category/search?${searchParam}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
      
      if (response.data) {
        setCategories(response.data.items);
        setTotalPages(response.data.pageCount);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(page, searchQuery);
  }, [page]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setPage(1);
    fetchCategories(1, value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading && !categories.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading categories...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100%',
      backgroundColor: 'white',
      borderRadius: 1,
      p: 3
    }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          Categories
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography sx={{ mr: 2 }}>Search by name:</Typography>
          <TextField
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            sx={{ width: 300 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {categories.length === 0 ? (
        <Typography>No categories found</Typography>
      ) : (
        <>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              {categories.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      backgroundColor: '#fff9c4',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        {category.name}
                      </Typography>
                      {category.description && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            mt: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {category.description}
                        </Typography>
                      )}
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        Articles: {category.articleCount}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        component={Link} 
                        to={`/categories/${category.id}`}
                      >
                        View Articles
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      <Fab 
        color="success" 
        sx={{ 
          position: 'fixed',
          bottom: 32,
          right: 32
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Categories; 