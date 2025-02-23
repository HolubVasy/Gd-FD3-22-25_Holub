import { Note } from '../Note';

export interface ViewModeProps {
  note: Note;
  onClose: () => void;
} 