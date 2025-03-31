// src/redux/slices/articleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../../types/models';
import axios, { AxiosError } from 'axios';

interface ArticleState {
  list: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
}

interface ErrorResponse {
  message: string;
  status: number;
}

interface ApiResponse<T> {
  items: T[];
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface FetchArticlesParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

const initialState: ArticleState = {
  list: [],
  currentArticle: null,
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk<
  Article[],
  FetchArticlesParams,
  { rejectValue: string }
>(
  'articles/fetchArticles',
  async ({ pageNumber = 1, pageSize = 10, search = '' }, { rejectWithValue }) => {
    try {
      const searchParam = search ? `name=${encodeURIComponent(search)}` : 'name=';
      const response = await axios.get<ApiResponse<Article>>(
        `${API_BASE_URL}/article/search?${searchParam}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response.data.items;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch articles'
      );
    }
  }
);

export const fetchArticleById = createAsyncThunk<
  Article,
  number,
  { rejectValue: string }
>(
  'articles/fetchArticleById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<Article>(`${API_BASE_URL}/article/${id}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch article'
      );
    }
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.list = action.payload;
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
  },
  extraReducers: builder => {
    // Fetch articles
    builder.addCase(fetchArticles.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.error = null;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Failed to fetch articles';
    });

    // Fetch article by id
    builder.addCase(fetchArticleById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchArticleById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentArticle = action.payload;
      state.error = null;
    });
    builder.addCase(fetchArticleById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Failed to fetch article';
      state.currentArticle = null;
    });
  },
});

export const { setArticles, setCurrentArticle, setLoading, setError } = articleSlice.actions;
export default articleSlice.reducer;
