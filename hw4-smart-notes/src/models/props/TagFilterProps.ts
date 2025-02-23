import { Tag } from '../Tag';

export interface TagFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
  tags: Tag[];
} 