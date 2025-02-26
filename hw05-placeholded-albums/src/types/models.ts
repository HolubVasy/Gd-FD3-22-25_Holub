export type Album = {
  userId: number;
  id: number;
  title: string;
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
}

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
} 