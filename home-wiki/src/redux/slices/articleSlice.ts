// src/redux/slices/articleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../../types/models';

interface ArticleState {
  list: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  list: [],
  currentArticle: null,
  loading: false,
  error: null,
};

export const fetchArticles = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    // API call will go here
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch articles'));
  }
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.list = action.payload;
    },
    setCurrentArticle: (state, action: PayloadAction<Article | null>) => {
      state.currentArticle = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setArticles, setCurrentArticle, setLoading, setError } = articleSlice.actions;
export default articleSlice.reducer;
