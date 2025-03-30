import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
  CircularProgress,
  ListItemButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { api } from '#/services/api';
import { Category, Tag } from '#/types/models';

const Sidebar: React.FC = () => {
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
        const [categoriesData, tagsData] = await Promise.all([
          api.getCategories(),
          api.getTags(),
        ]);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
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
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav">
        {/* Categories Section */}
        <ListItemButton onClick={handleCategoriesClick}>
          <ListItemText primary="Categories" />
          {openCategories ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openCategories} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map((category) => (
              <ListItem key={category.id} sx={{ pl: 4 }}>
                <ListItemText 
                  primary={category.name}
                  secondary={`Articles: ${category.articleCount}`}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Tags Section */}
        <ListItemButton onClick={handleTagsClick}>
          <ListItemText primary="Tags" />
          {openTags ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openTags} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {tags.map((tag) => (
              <ListItem key={tag.id} sx={{ pl: 4 }}>
                <ListItemText 
                  primary={tag.name}
                  secondary={`Usage: ${tag.usageCount}`}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default Sidebar; 