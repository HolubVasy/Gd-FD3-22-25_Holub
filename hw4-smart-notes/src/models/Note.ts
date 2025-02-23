export interface Note {
  id: string;
  tagId: string | null;
  title: string | null;
  text: string;
  created: Date;
  updated: Date;
}