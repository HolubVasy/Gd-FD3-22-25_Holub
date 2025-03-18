import React, { useEffect, useState } from "react";
import { useCategories } from '../../hooks/useCategories';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Box,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Category } from '../../types/types';
import CategoryEditDialog from './CategoryEditDialog';

const CategoryList: React.FC = () => {
  const {
    categories,
    loading,
    error,
    searchQuery,
    fetchCategories,
    searchCategoriesByKeyword,
    removeCategory,
    updateCategoryName,
  } = useCategories();

  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    searchCategoriesByKeyword(value);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleEditClose = () => {
    setEditingCategory(null);
  };

  const handleEditSave = async (name: string, description?: string) => {
    if (editingCategory) {
      await updateCategoryName(editingCategory.id, name, description);
      handleEditClose();
    }
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
    <Box>
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      <List>
        {categories.map((category: Category) => (
          <ListItem key={category.id} divider>
            <ListItemText
              primary={category.name}
              secondary={category.description}
            />
            <Box mr={2}>
              <Chip
                label={`${category.articleCount} articles`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEdit(category)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeCategory(category.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <CategoryEditDialog
        open={!!editingCategory}
        category={editingCategory}
        onClose={handleEditClose}
        onSave={handleEditSave}
      />
    </Box>
  );
};

export default CategoryList;
