import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  TextField,
  IconButton,
  Pagination,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import axios from 'axios';
import { Article, Category } from '#/types/models';

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

const CategoryArticles = () => {
  const { id } = useParams<{ id: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchArticles = async (pageNumber: number, search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchParam = search ? `&name=${encodeURIComponent(search)}` : '';
      const url = `${API_BASE_URL}/article/category/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}${searchParam}`;
      console.log('Fetching articles from:', url);
      
      const response = await axios.get(url);
      console.log('Articles response:', response.data);
      
      if (response.data && Array.isArray(response.data.items)) {
        setArticles(response.data.items);
        setTotalPages(Math.ceil(response.data.totalItemCount / pageSize));
      } else {
        console.error('Invalid response format:', response.data);
        setError('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      setError(null);
      const url = `${API_BASE_URL}/category/${id}`;
      console.log('Fetching category from:', url);
      
      const response = await axios.get(url);
      console.log('Category response:', response.data);
      setCategory(response.data);
    } catch (error) {
      console.error('Error fetching category:', error);
      setError('Failed to load category');
    }
  };

  useEffect(() => {
    console.log('CategoryArticles mounted/updated with id:', id);
    if (id) {
      fetchCategory();
      fetchArticles(page, searchQuery);
    }
  }, [id]);

  useEffect(() => {
    if (id && !loading) {
      fetchArticles(page, searchQuery);
    }
  }, [page]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log('Search query changed:', value);
    setSearchQuery(value);
    setPage(1);
    if (id) {
      fetchArticles(1, value);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log('Page changed to:', value);
    setPage(value);
  };

  if (loading && !articles.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading articles...</Typography>
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
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          {category?.name || 'Loading category...'}
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

      {articles.length === 0 ? (
        <Typography>No articles found</Typography>
      ) : (
        <>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} columns={25}>
              {articles.map((article) => (
                <Grid item xs={25} sm={12.5} md={5} key={article.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#e0f2f1',
                      borderRadius: 1,
                      '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease-in-out'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography 
                          variant="h6" 
                          component="h2" 
                          sx={{ 
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            mb: 1,
                            flex: 1,
                            pr: 1
                          }}
                        >
                          {article.name}
                        </Typography>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            p: 0.5,
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          height: '4.5em',
                          mb: 1
                        }}
                      >
                        {article.description}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ display: 'block', mt: 'auto' }}
                      >
                        {new Date(article.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
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
    </Box>
  );
};

export default CategoryArticles; 