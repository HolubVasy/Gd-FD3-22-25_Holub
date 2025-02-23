import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../types/Tag';
import { v4 as uuidv4 } from 'uuid';

interface EditTagPayload {
  id: string;
  name: string;
}

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
    editTag: (state, action: PayloadAction<EditTagPayload>) => {
      return state.map(tag => {
        if (tag.id === action.payload.id) {
          return {
            ...tag,
            name: action.payload.name
          };
        }
        return tag;
      });
    },
    // Add other reducers for rename, delete, etc.
  },
});

export const { addTag, editTag } = tagsSlice.actions;
export default tagsSlice.reducer;