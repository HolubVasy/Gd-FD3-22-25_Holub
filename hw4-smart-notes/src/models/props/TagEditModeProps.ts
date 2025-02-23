export interface TagEditModeProps {
  name: string;
  mode: 'edit' | 'add';
  onNameChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
} 