import { Tag } from '../Tag';

export interface TagModalProps {
  open: boolean;
  onClose: () => void;
  tag?: Tag;
  mode?: 'edit' | 'add';
} 