// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
import tagsReducer from './tagsSlice';
import { loadState, saveState } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';

const preloadedState = {
  notes: loadState('notes') || [
    { id: uuidv4(), tagId: null, title: 'Note 1', text: 'Sample text 1', created: new Date(), updated: new Date() },
    { id: uuidv4(), tagId: null, title: 'Note 2', text: 'Sample text 2', created: new Date(), updated: new Date() },
  ],
  tags: loadState('tags') || [
    { id: uuidv4(), name: 'Personal', count: 0 },
    { id: uuidv4(), name: 'Work', count: 0 },
  ],
};

const store = configureStore({
  reducer: {
    notes: notesReducer,
    tags: tagsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState('notes', store.getState().notes);
  saveState('tags', store.getState().tags);
});

export default store;