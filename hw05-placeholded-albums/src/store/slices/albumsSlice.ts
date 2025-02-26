import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types/models';

type AlbumsState = {
  items: Album[];
  currentAlbum: Album | null;
  loading: boolean;
  error: string | null;
}

const initialState: AlbumsState = {
  items: [],
  currentAlbum: null,
  loading: false,
  error: null,
};

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    return response.json();
  }
);

export const fetchAlbumById = createAsyncThunk(
  'albums/fetchAlbumById',
  async (id: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
    return response.json();
  }
);

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch albums';
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.currentAlbum = action.payload;
      });
  },
});

export default albumsSlice.reducer; 