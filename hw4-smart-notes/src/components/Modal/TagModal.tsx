import React from 'react';
import { Modal } from 'react-responsive-modal';

interface TagModalProps {
  open: boolean;
  onClose: () => void;
}

const TagModal: React.FC<TagModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} center>
      <h2>Add/Edit Tag</h2>
      {/* Add form for tag details */}
    </Modal>
  );
};

export default TagModal; 