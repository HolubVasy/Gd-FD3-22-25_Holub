import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../types/Note';
import { v4 as uuidv4 } from 'uuid';

const initialState: Note[] = [];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ text: string; tagId: string | null }>) => {
      const newNote: Note = {
        id: uuidv4(),
        tagId: action.payload.tagId,
        title: action.payload.text.slice(0, 10) + (action.payload.text.length > 10 ? '...' : ''),
        text: action.payload.text,
        created: new Date(),
        updated: new Date(),
      };
      state.push(newNote);
    },
    // Add other reducers for edit, delete, etc.
  },
});

export const { addNote } = notesSlice.actions;
export default notesSlice.reducer; 