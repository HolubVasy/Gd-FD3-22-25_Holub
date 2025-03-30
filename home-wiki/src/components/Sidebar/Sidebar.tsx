import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItemButton, ListItemText, Collapse, CircularProgress } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '#/redux/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { Category, Tag } from '#/types/models';
import { setCategories, setLoading as setCategoriesLoading } from '#/redux/slices/categorySlice';
import { setTags, setLoading as setTagsLoading } from '#/redux/slices/tagSlice';
import axios from 'axios';

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

const Sidebar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(false);
  const dispatch = useAppDispatch();
  
  const categories = useAppSelector((state) => state.categories.list);
  const tags = useAppSelector((state) => state.tags.list);
  const loading = useAppSelector((state) => state.categories.loading || state.tags.loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setCategoriesLoading(true));
        dispatch(setTagsLoading(true));

        const [categoriesResponse, tagsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/category`),
          axios.get(`${API_BASE_URL}/tag`)
        ]);

        dispatch(setCategories(categoriesResponse.data));
        dispatch(setTags(tagsResponse.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        dispatch(setCategoriesLoading(false));
        dispatch(setTagsLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleCategoriesClick = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const handleTagsClick = () => {
    setTagsOpen(!tagsOpen);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: 'white',
      borderRadius: 1,
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
    }}>
      <List component="nav" sx={{ p: 0 }}>
        {/* Categories Section */}
        <ListItemButton onClick={handleCategoriesClick}>
          <ListItemText 
            primary="Categories" 
            primaryTypographyProps={{
              sx: { fontWeight: categoriesOpen ? 'bold' : 'normal' }
            }}
          />
          {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={categoriesOpen} timeout="auto">
          <List component="div" disablePadding>
            {categories.map((category: Category) => (
              <ListItemButton 
                key={category.id}
                component={RouterLink}
                to={`/categories/${category.id}`}
                sx={{ pl: 4 }}
              >
                <ListItemText 
                  primary={category.name}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '0.9rem',
                      color: '#666'
                    }
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* Tags Section */}
        <ListItemButton onClick={handleTagsClick}>
          <ListItemText 
            primary="Tags" 
            primaryTypographyProps={{
              sx: { fontWeight: tagsOpen ? 'bold' : 'normal' }
            }}
          />
          {tagsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={tagsOpen} timeout="auto">
          <List component="div" disablePadding>
            {tags.map((tag: Tag) => (
              <ListItemButton 
                key={tag.id}
                component={RouterLink}
                to={`/tags/${tag.id}`}
                sx={{ pl: 4 }}
              >
                <ListItemText 
                  primary={tag.name}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '0.9rem',
                      color: '#666'
                    }
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default Sidebar; 