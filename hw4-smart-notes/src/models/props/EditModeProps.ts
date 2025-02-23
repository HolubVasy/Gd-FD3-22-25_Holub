import { Tag } from '../Tag';

export interface EditModeProps {
  title: string;
  description: string;
  tagId: string;
  mode: 'edit' | 'add';
  tags: Tag[];
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}