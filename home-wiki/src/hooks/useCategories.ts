import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { categoryService } from '../services/categoryService';
import { Category } from '../types/models';
import {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  setLoading,
  setError,
  setSearchQuery,
  setSelectedCategory,
} from '../redux/slices/categorySlice';
import { toast } from 'react-toastify';

export const useCategories = () => {
  const dispatch = useDispatch();
  const { list: categories, loading, error, searchQuery, selectedCategory } = useSelector(
    (state: RootState) => state.categories
  );

  const fetchCategories = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await categoryService.getCategories();
      dispatch(setCategories(data));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch categories'));
      toast.error('Failed to fetch categories');
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const searchCategoriesByKeyword = useCallback(
    async (keyword: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(setSearchQuery(keyword));
        const data = await categoryService.searchCategories(keyword);
        dispatch(setCategories(data));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to search categories'));
        toast.error('Failed to search categories');
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const createCategory = useCallback(
    async (name: string, description?: string) => {
      try {
        dispatch(setLoading(true));
        const newCategory = await categoryService.createCategory(name, description);
        dispatch(addCategory(newCategory));
        toast.success('Category created successfully');
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to create category'));
        toast.error('Failed to create category');
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const updateCategoryName = useCallback(
    async (id: number, name: string, description?: string) => {
      try {
        dispatch(setLoading(true));
        const updatedCategory = await categoryService.updateCategory(id, name, description);
        dispatch(updateCategory(updatedCategory));
        toast.success('Category updated successfully');
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to update category'));
        toast.error('Failed to update category');
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const removeCategory = useCallback(
    async (id: number) => {
      try {
        dispatch(setLoading(true));
        const canDelete = await categoryService.canDeleteCategory(id);
        if (!canDelete) {
          toast.error('Cannot delete category: it contains articles');
          return;
        }
        await categoryService.deleteCategory(id);
        dispatch(deleteCategory(id));
        toast.success('Category deleted successfully');
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to delete category'));
        toast.error('Failed to delete category');
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const selectCategory = useCallback(
    (category: Category | null) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch]
  );

  return {
    categories,
    loading,
    error,
    searchQuery,
    selectedCategory,
    fetchCategories,
    searchCategoriesByKeyword,
    createCategory,
    updateCategoryName,
    removeCategory,
    selectCategory,
  };
};
