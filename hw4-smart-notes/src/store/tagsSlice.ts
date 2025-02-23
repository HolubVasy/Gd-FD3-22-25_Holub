import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../types/Tag';
import { v4 as uuidv4 } from 'uuid';

const initialState: Tag[] = [];

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string>) => {
      const newTag: Tag = {
        id: uuidv4(),
        name: action.payload,
        count: 0,
      };
      state.push(newTag);
    },
    // Add other reducers for rename, delete, etc.
  },
});

export const { addTag } = tagsSlice.actions;
export default tagsSlice.reducer;