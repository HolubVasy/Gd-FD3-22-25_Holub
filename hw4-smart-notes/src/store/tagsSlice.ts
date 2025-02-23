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
    deleteTag: (state, action: PayloadAction<string>) => {
      return state.filter(tag => tag.id !== action.payload);
    },
    updateTagCount: (state, action: PayloadAction<string>) => {
      return state.map(tag => {
        if (tag.id === action.payload) {
          return {
            ...tag,
            count: tag.count + 1
          };
        }
        return tag;
      });
    }
  },
});

export const { addTag, editTag, deleteTag, updateTagCount } = tagsSlice.actions;
export default tagsSlice.reducer;