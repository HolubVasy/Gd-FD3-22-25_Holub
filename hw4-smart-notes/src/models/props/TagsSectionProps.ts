export interface TagsSectionProps {
  tagFilter: string;
  setTagFilter: (filter: string) => void;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}
