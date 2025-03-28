// src/redux/slices/articleSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ArticleState, Article } from '../../types/models';
import { ArticleService } from '../../api/ArticleService';

const initialState: ArticleState = {
  list: [],
  loading: false,
  error: null,
  currentArticle: null,
};

export const fetchArticles = createAsyncThunk<Article[], { pageNumber?: number; pageSize?: number }>(
  'articles/fetchArticles',
  async ({ pageNumber = 1, pageSize = 10 }) => {
    // В данном случае предположим, что метод getArticles возвращает
    // НЕ PagedList<Article>, а просто массив. Если PagedList — адаптируйте.
    const paged = await ArticleService.getArticles(pageNumber, pageSize);
    return paged.items; // возьмём items
  }
);

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentArticle(state, action) {
      state.currentArticle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch articles';
    });
  },
});

export const { setCurrentArticle } = articleSlice.actions;
export default articleSlice.reducer;
