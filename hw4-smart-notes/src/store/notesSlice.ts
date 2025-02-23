import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../types/Note';
import { v4 as uuidv4 } from 'uuid';

interface EditNotePayload {
  id: string;
  text: string;
  tagId: string | null;
}

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
    deleteNote: (state, action: PayloadAction<string>) => {
      return state.filter(note => note.id !== action.payload);
    },
    editNote: (state, action: PayloadAction<EditNotePayload>) => {
      return state.map(note => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            text: action.payload.text,
            tagId: action.payload.tagId,
            title: action.payload.text.slice(0, 10) + (action.payload.text.length > 10 ? '...' : ''),
            updated: new Date()
          };
        }
        return note;
      });
    }
  },
});

export const { addNote, deleteNote, editNote } = notesSlice.actions;
export default notesSlice.reducer;