import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryState, Category } from '#/types/models';

const initialState: CategoryState = {
  list: [],
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
      state.list = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.list.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.list.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(cat => cat.id !== action.payload);
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
    incrementArticleCount: (state, action: PayloadAction<number>) => {
      const category = state.list.find(c => c.id === action.payload);
      if (category) {
        category.articleCount += 1;
      }
    },
    decrementArticleCount: (state, action: PayloadAction<number>) => {
      const category = state.list.find(c => c.id === action.payload);
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
