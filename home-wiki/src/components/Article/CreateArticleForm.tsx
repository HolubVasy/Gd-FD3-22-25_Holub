import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  Chip,
  Button,
  Typography,
  Paper
} from '@mui/material';
import axios from 'axios';
import { Category, Tag } from '#/types/models';

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

interface CreateArticleFormProps {
  onClose: () => void;
  initialCategoryId?: string;
  initialTagId?: string;
}

const CreateArticleForm: React.FC<CreateArticleFormProps> = ({ 
  onClose,
  initialCategoryId,
  initialTagId
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/category`),
          axios.get(`${API_BASE_URL}/tag`)
        ]);

        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);

        if (initialCategoryId) {
          const categoryIdNumber = parseInt(initialCategoryId, 10);
          const category = categoriesResponse.data.find((c: Category) => c.id === categoryIdNumber);
          if (category) setSelectedCategory(category);
        }

        if (initialTagId) {
          const tagIdNumber = parseInt(initialTagId, 10);
          const tag = tagsResponse.data.find((t: Tag) => t.id === tagIdNumber);
          if (tag) setSelectedTags([tag]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [initialCategoryId, initialTagId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const articleData = {
        name,
        description,
        categoryId: selectedCategory?.id,
        tagIds: selectedTags.map(tag => tag.id)
      };

      await axios.post(`${API_BASE_URL}/article`, articleData);
      onClose();
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  if (loading) {
    return <Typography>Loading form...</Typography>;
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        maxWidth: 600,
        mx: 'auto',
        mt: 2
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
        Create New Article
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Article Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          multiline
          rows={4}
        />

        <Autocomplete
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
          options={categories}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              required
            />
          )}
        />

        <Autocomplete
          multiple
          value={selectedTags}
          onChange={(_, newValue) => setSelectedTags(newValue)}
          options={tags}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Select tags"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.name}
                {...getTagProps({ index })}
                sx={{ 
                  backgroundColor: '#e0f2f1',
                  '&:hover': { backgroundColor: '#b2dfdb' }
                }}
              />
            ))
          }
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="success"
          >
            Create Article
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateArticleForm; 