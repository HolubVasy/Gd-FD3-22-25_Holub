import { Note } from '../Note';

export interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  note?: Note;
  mode?: 'view' | 'edit' | 'add';
} 