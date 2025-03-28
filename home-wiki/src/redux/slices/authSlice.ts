// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types/models';
import { AuthService } from '../../api';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Example of async operation
export const login = createAsyncThunk<User, { email: string; password: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await AuthService.login(email, password);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login error');
    }
  }
);

export const register = createAsyncThunk<User, { email: string; password: string; displayName: string }>(
  'auth/register',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const user = await AuthService.register(email, password);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Registration error');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
      // Save token if it exists
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
