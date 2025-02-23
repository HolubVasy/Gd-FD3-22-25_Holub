import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { useDispatch } from 'react-redux';
import { Note } from '../../models/Note';
import { NoteModalProps } from '../../models/props/NoteModalProps';
import 'react-responsive-modal/styles.css';

const NoteModal: React.FC<NoteModalProps> = ({ open, onClose, note, mode = 'add' }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(note?.text || '');
  const [tagId, setTagId] = useState(note?.tagId || null);

  const handleSave = () => {
    if (mode === 'edit' && note) {
      dispatch({ 
        type: 'notes/editNote', 
        payload: { 
          id: note.id, 
          text, 
          tagId 
        } 
      });
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} center>
      <div className="modal-content">
        <h2>{mode === 'view' ? note?.title || 'View Note' : mode === 'edit' ? 'Edit Note' : 'Add Note'}</h2>
        <textarea
          value={mode === 'view' ? note?.text || '' : text}
          onChange={(e) => setText(e.target.value)}
          disabled={mode === 'view'}
          placeholder="Type note text here..."
        />
        {mode !== 'view' && (
          <div className="modal-actions">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NoteModal; 