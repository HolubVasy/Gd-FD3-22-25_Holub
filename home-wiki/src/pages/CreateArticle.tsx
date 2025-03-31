import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  CircularProgress,
  Alert,
  Chip,
  SelectChangeEvent,
  OutlinedInput
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

export default function CreateArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    selectedTags: [] as number[]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          axios.get<{ items: Category[] }>(`${API_BASE_URL}/category/search?name=&pageNumber=1&pageSize=100`),
          axios.get<{ items: Tag[] }>(`${API_BASE_URL}/tag/search?name=&pageNumber=1&pageSize=100`)
        ]);

        setCategories(categoriesResponse.data.items);
        setTags(tagsResponse.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load categories and tags');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.categoryId) {
      setError('Please select a category');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axios.post(`${API_BASE_URL}/article`, {
        name: formData.name,
        description: formData.description,
        categoryId: Number(formData.categoryId),
        tagIds: formData.selectedTags
      });

      navigate('/articles');
    } catch (error) {
      console.error('Error creating article:', error);
      setError('Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      categoryId: event.target.value
    }));
  };

  const handleTagChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    setFormData(prev => ({
      ...prev,
      selectedTags: value
    }));
  };

  if (loading && !categories.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white', borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Article
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Article Title"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.categoryId}
              onChange={handleCategoryChange}
              label="Category"
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={formData.selectedTags}
              onChange={handleTagChange}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip 
                      key={value} 
                      label={tags.find(tag => tag.id === value)?.name} 
                      sx={{ backgroundColor: '#b9f6ca' }}
                    />
                  ))}
                </Box>
              )}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/articles')}
              sx={{ minWidth: 120 }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
} 