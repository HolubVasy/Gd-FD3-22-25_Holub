import React from 'react';
import { Modal } from 'react-responsive-modal';

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} center>
      <h2>Add/Edit Note</h2>
      {/* Add form for note details */}
    </Modal>
  );
};

export default NoteModal; 