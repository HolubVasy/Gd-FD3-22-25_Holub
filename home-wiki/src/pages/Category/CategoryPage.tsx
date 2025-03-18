import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import CategoryList from '../../components/Category/CategoryList';
import CategoryEditDialog from '../../components/Category/CategoryEditDialog';
import { useCategories } from '../../hooks/useCategories';

const CategoryPage: React.FC = () => {
  const { createCategory } = useCategories();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateCategory = async (name: string, description?: string) => {
    await createCategory(name, description);
    setIsCreateDialogOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            Categories
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateDialogOpen(true)}
          >
            New Category
          </Button>
        </Box>

        <CategoryList />

        <CategoryEditDialog
          open={isCreateDialogOpen}
          category={null}
          onClose={() => setIsCreateDialogOpen(false)}
          onSave={handleCreateCategory}
        />
      </Box>
    </Container>
  );
};

export default CategoryPage; 