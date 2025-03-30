import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Collapse,
  CircularProgress
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import axios from 'axios';
import { Category, Tag } from '#/types/models';

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState(true);
  const [openTags, setOpenTags] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesResponse, tagsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/category`),
          axios.get(`${API_BASE_URL}/tag`)
        ]);
        
        console.log('Categories response:', categoriesResponse.data);
        console.log('Tags response:', tagsResponse.data);
        
        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
    setOpenTags(false);
  };

  const handleTagsClick = () => {
    setOpenTags(!openTags);
    setOpenCategories(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
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
    <List component="nav" sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItemButton onClick={handleCategoriesClick}>
        <ListItemText 
          primary={
            <Typography variant="subtitle1" fontWeight="bold">
              Categories
            </Typography>
          } 
        />
        {openCategories ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCategories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categories.map((category) => (
            <ListItemButton
              key={category.id}
              component={Link}
              to={`/categories/${category.id}`}
              sx={{
                pl: 4,
                '&:hover': {
                  backgroundColor: '#e3f2fd'
                }
              }}
            >
              <ListItemText 
                primary={category.name}
                primaryTypographyProps={{
                  fontSize: '0.9rem'
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <ListItemButton onClick={handleTagsClick}>
        <ListItemText 
          primary={
            <Typography variant="subtitle1" fontWeight="bold">
              Tags
            </Typography>
          }
        />
        {openTags ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openTags} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {tags.map((tag) => (
            <ListItemButton
              key={tag.id}
              component={Link}
              to={`/tag/${tag.id}`}
              sx={{
                pl: 4,
                '&:hover': {
                  backgroundColor: '#e3f2fd'
                }
              }}
            >
              <ListItemText 
                primary={tag.name}
                primaryTypographyProps={{
                  fontSize: '0.9rem'
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default Sidebar; 