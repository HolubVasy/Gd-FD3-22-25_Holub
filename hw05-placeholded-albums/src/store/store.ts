import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './slices/albumsSlice';
import usersReducer from './slices/usersSlice';
import photosReducer from './slices/photosSlice';

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    users: usersReducer,
    photos: photosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 