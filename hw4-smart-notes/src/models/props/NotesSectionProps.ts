export interface NotesSectionProps {
  noteFilter: string;
  setNoteFilter: (filter: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tagId: string | null) => void;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
} 