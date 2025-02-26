import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/models';

interface UsersState {
  items: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  currentUser: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export default usersSlice.reducer; 