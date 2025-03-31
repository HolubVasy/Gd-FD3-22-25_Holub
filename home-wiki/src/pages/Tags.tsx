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
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import { Tag } from '#/types/models';

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchTags = async (pageNumber: number, search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchParam = search ? `name=${encodeURIComponent(search)}` : 'name=';
      const response = await axios.get(`${API_BASE_URL}/tag/search?${searchParam}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
      
      if (response.data) {
        setTags(response.data.items);
        setTotalPages(response.data.pageCount);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      setError('Failed to load tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags(page, searchQuery);
  }, [page]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setPage(1);
    fetchTags(1, value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading && !tags.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading tags...</Typography>
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
      backgroundColor: '#f1f8e9', // Салатовый фон
      borderRadius: 1,
      p: 3
    }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          Tags
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

      {tags.length === 0 ? (
        <Typography>No tags found</Typography>
      ) : (
        <>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              {tags.map((tag) => (
                <Grid item xs={12} sm={6} md={3} key={tag.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      backgroundColor: '#ffffff',
                      borderRadius: 1,
                      '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease-in-out'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        {tag.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                      >
                        Usage count: {tag.usageCount}
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
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Tags; 