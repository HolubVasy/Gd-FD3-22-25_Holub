import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types/models';
import axios, { AxiosError } from 'axios';

interface CategoryState {
  list: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;
  totalItems: number;
  currentPage: number;
  totalPages: number;
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

interface FetchCategoriesParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

const initialState: CategoryState = {
  list: [],
  currentCategory: null,
  loading: false,
  error: null,
  totalItems: 0,
  currentPage: 1,
  totalPages: 1,
};

export const fetchCategories = createAsyncThunk<
  ApiResponse<Category>,
  FetchCategoriesParams,
  { rejectValue: string }
>(
  'categories/fetchCategories',
  async ({ pageNumber = 1, pageSize = 10, search = '' }, { rejectWithValue }) => {
    try {
      const searchParam = search ? `name=${encodeURIComponent(search)}` : 'name=';
      const response = await axios.get<ApiResponse<Category>>(
        `${API_BASE_URL}/category/search?${searchParam}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch categories'
      );
    }
  }
);

export const fetchCategoryById = createAsyncThunk<
  Category,
  number,
  { rejectValue: string }
>(
  'categories/fetchCategoryById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<Category>(`${API_BASE_URL}/category/${id}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category'
      );
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.list = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<Category | null>) => {
      state.currentCategory = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    // Fetch categories
    builder.addCase(fetchCategories.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.items;
      state.totalItems = action.payload.totalItemCount;
      state.totalPages = action.payload.pageCount;
      state.currentPage = action.payload.pageNumber;
      state.error = null;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Failed to fetch categories';
    });

    // Fetch category by id
    builder.addCase(fetchCategoryById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentCategory = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Failed to fetch category';
      state.currentCategory = null;
    });
  },
});

export const { 
  setCategories, 
  setCurrentCategory, 
  setLoading, 
  setError,
  setCurrentPage 
} = categorySlice.actions;

export default categorySlice.reducer;
