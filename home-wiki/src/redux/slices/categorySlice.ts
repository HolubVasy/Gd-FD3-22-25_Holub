import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryState, Category } from '../../types/types';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
    incrementArticleCount: (state, action: PayloadAction<string>) => {
      const category = state.categories.find(c => c.id === action.payload);
      if (category) {
        category.articleCount += 1;
      }
    },
    decrementArticleCount: (state, action: PayloadAction<string>) => {
      const category = state.categories.find(c => c.id === action.payload);
      if (category && category.articleCount > 0) {
        category.articleCount -= 1;
      }
    },
  },
});

export const {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  setLoading,
  setError,
  setSearchQuery,
  setSelectedCategory,
  incrementArticleCount,
  decrementArticleCount,
} = categorySlice.actions;

export default categorySlice.reducer; 