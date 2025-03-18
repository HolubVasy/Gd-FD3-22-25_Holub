import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleState, Article } from '../../types/types';

const initialState: ArticleState = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  },
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
    setCurrentArticle: (state, action: PayloadAction<Article | null>) => {
      state.currentArticle = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPagination: (state, action: PayloadAction<{ currentPage: number; totalPages: number }>) => {
      state.pagination.currentPage = action.payload.currentPage;
      state.pagination.totalPages = action.payload.totalPages;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const article = state.articles.find(a => a.id === action.payload);
      if (article) {
        article.isFavorite = !article.isFavorite;
      }
      if (state.currentArticle?.id === action.payload) {
        state.currentArticle.isFavorite = !state.currentArticle.isFavorite;
      }
    },
  },
});

export const {
  setArticles,
  setCurrentArticle,
  setLoading,
  setError,
  setPagination,
  toggleFavorite,
} = articleSlice.actions;

export default articleSlice.reducer; 