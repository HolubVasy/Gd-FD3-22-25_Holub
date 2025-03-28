import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TagState, Tag } from '../../types/models';

const initialState: TagState = {
  tags: [],
  loading: false,
  error: null,
  searchQuery: '',
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      state.tags.push(action.payload);
    },
    updateTag: (state, action: PayloadAction<Tag>) => {
      const index = state.tags.findIndex(tag => tag.id === action.payload.id);
      if (index !== -1) {
        state.tags[index] = action.payload;
      }
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter(tag => tag.id !== action.payload);
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
    incrementTagUsage: (state, action: PayloadAction<string>) => {
      const tag = state.tags.find(t => t.id === action.payload);
      if (tag) {
        tag.usageCount += 1;
      }
    },
    decrementTagUsage: (state, action: PayloadAction<string>) => {
      const tag = state.tags.find(t => t.id === action.payload);
      if (tag && tag.usageCount > 0) {
        tag.usageCount -= 1;
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
