import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Note } from '../../types/Note';
import NoteModal from '../Modal/NoteModal';

interface NoteProps {
  note: Note;
}

const NoteComponent: React.FC<NoteProps> = ({ note }) => {
  const dispatch = useDispatch();
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleView = () => {
    setViewModalOpen(true);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch({ type: 'notes/deleteNote', payload: note.id });
    }
  };

  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.text}</p>
      <p>{new Date(note.created).toLocaleString()}</p>
      <div className="note-actions">
        <button className="action-btn" onClick={handleView}>view</button>
        <button className="action-btn" onClick={handleEdit}>edit</button>
        <button className="action-btn" onClick={handleDelete}>delete</button>
      </div>
      <NoteModal 
        open={isViewModalOpen} 
        onClose={() => setViewModalOpen(false)} 
        note={note}
        mode="view"
      />
      <NoteModal 
        open={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        note={note}
        mode="edit"
      />
    </div>
  );
};

export default NoteComponent;