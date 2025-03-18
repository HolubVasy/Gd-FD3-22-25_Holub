export type User = {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
};

export type Article = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isFavorite?: boolean;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

export type ArticleState = {
  articles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
};

export type SearchState = {
  recentSearches: string[];
  currentSearch: string;
};

export type Tag = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
};

export type TagState = {
  tags: Tag[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  articleCount: number;
};

export type CategoryState = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: Category | null;
};

export type RootState = {
  auth: AuthState;
  articles: ArticleState;
  search: SearchState;
  tags: TagState;
  categories: CategoryState;
}; 