import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Photo } from '../../types/models';

interface PhotosState {
  items: Photo[];
  currentPhoto: Photo | null;
  albumPhotos: Photo[];
  loading: boolean;
  error: string | null;
}

const initialState: PhotosState = {
  items: [],
  currentPhoto: null,
  albumPhotos: [],
  loading: false,
  error: null,
};

export const fetchPhotosByAlbumId = createAsyncThunk(
  'photos/fetchPhotosByAlbumId',
  async (albumId: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    return response.json();
  }
);

export const fetchRandomPhoto = createAsyncThunk(
  'photos/fetchRandomPhoto',
  async () => {
    const randomId = Math.floor(Math.random() * 5000) + 1;
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${randomId}`);
    return response.json();
  }
);

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotosByAlbumId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhotosByAlbumId.fulfilled, (state, action) => {
        state.loading = false;
        state.albumPhotos = action.payload;
      })
      .addCase(fetchPhotosByAlbumId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch photos';
      })
      .addCase(fetchRandomPhoto.fulfilled, (state, action) => {
        state.currentPhoto = action.payload;
      });
  },
});

export default photosSlice.reducer; 