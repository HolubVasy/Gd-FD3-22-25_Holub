import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import articleReducer from './slices/articleSlice';
import searchReducer from './slices/searchSlice';
import tagReducer from './slices/tagSlice';
import categoryReducer from './slices/categorySlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'search'], // Only persist auth and search state
};

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
  search: searchReducer,
  tags: tagReducer,
  categories: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 