import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TagState, Tag } from '../../types/models';

const initialState: TagState = {
  list: [],
  loading: false,
  error: null,
  searchQuery: '',
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.list = action.payload;
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      state.list.push(action.payload);
    },
    updateTag: (state, action: PayloadAction<Tag>) => {
      const index = state.list.findIndex(tag => tag.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteTag: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(tag => tag.id !== action.payload);
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
    incrementTagUsage: (state, action: PayloadAction<number>) => {
      const tag = state.list.find(t => t.id === action.payload);
      if (tag) {
        tag.usageCount = (tag.usageCount || 0) + 1;
      }
    },
    decrementTagUsage: (state, action: PayloadAction<number>) => {
      const tag = state.list.find(t => t.id === action.payload);
      if (tag) {
        tag.usageCount = Math.max(0, (tag.usageCount || 0) - 1);
      }
    },
  },
});

export const {
  setTags,
  addTag,
  updateTag,
  deleteTag,
  setLoading,
  setError,
  setSearchQuery,
  incrementTagUsage,
  decrementTagUsage,
} = tagSlice.actions;

export default tagSlice.reducer;
