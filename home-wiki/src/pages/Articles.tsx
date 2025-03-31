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
  Fab
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import axios from 'axios';
import { Article } from '#/types/models';
import CreateArticleForm from '#/components/Article/CreateArticleForm';

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const pageSize = 10;

  const fetchArticles = async (pageNumber: number, search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchParam = search ? `&name=${encodeURIComponent(search)}` : '';
      const response = await axios.get(`${API_BASE_URL}/article?pageNumber=${pageNumber}&pageSize=${pageSize}${searchParam}`);
      
      if (response.data && Array.isArray(response.data.items)) {
        setArticles(response.data.items);
        setTotalPages(Math.ceil(response.data.totalItemCount / pageSize));
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page, searchQuery);
  }, [page]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setPage(1);
    fetchArticles(1, value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    fetchArticles(page, searchQuery);
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
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100%',
      backgroundColor: '#e0f2f1',
      borderRadius: 1,
      p: 3
    }}>
      {showCreateForm ? (
        <CreateArticleForm onClose={handleCloseForm} />
      ) : (
        <>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
              Articles
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
                          backgroundColor: '#fff',
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

          <Fab 
            color="success" 
            sx={{ 
              position: 'fixed',
              bottom: 32,
              right: 32
            }}
            onClick={handleCreateClick}
          >
            <AddIcon />
          </Fab>
        </>
      )}
    </Box>
  );
};

export default Articles;
