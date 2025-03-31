import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../../types/models';
import axios, { AxiosError } from 'axios';

interface TagState {
  list: Tag[];
  currentTag: Tag | null;
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

interface FetchTagsParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

const initialState: TagState = {
  list: [],
  currentTag: null,
  loading: false,
  error: null,
  totalItems: 0,
  currentPage: 1,
  totalPages: 1,
};

export const fetchTags = createAsyncThunk<
  ApiResponse<Tag>,
  FetchTagsParams,
  { rejectValue: string }
>(
  'tags/fetchTags',
  async ({ pageNumber = 1, pageSize = 10, search = '' }, { rejectWithValue }) => {
    try {
      const searchParam = search ? `name=${encodeURIComponent(search)}` : 'name=';
      const response = await axios.get<ApiResponse<Tag>>(
        `${API_BASE_URL}/tag/search?${searchParam}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch tags'
      );
    }
  }
);

export const fetchTagById = createAsyncThunk<
  Tag,
  number,
  { rejectValue: string }
>(
  'tags/fetchTagById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<Tag>(`${API_BASE_URL}/tag/${id}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch tag'
      );
    }
  }
);

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.list = action.payload;
    },
    setCurrentTag: (state, action: PayloadAction<Tag | null>) => {
      state.currentTag = action.payload;
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
    // Fetch tags
    builder.addCase(fetchTags.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.items;
      state.totalItems = action.payload.totalItemCount;
      state.totalPages = action.payload.pageCount;
      state.currentPage = action.payload.pageNumber;
      state.error = null;
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Failed to fetch tags';
    });

    // Fetch tag by id
    builder.addCase(fetchTagById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTagById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentTag = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTagById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Failed to fetch tag';
      state.currentTag = null;
    });
  },
});

export const { 
  setTags, 
  setCurrentTag, 
  setLoading, 
  setError,
  setCurrentPage 
} = tagSlice.actions;

export default tagSlice.reducer;
