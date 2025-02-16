import React from 'react';
import { Note } from '../../types/Note';

interface NoteProps {
  note: Note;
}

const NoteComponent: React.FC<NoteProps> = ({ note }) => {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.text}</p>
      <p>{note.created.toISOString()}</p>
      <div className="note-buttons">
        <button className="view-btn">view</button>
        <button className="edit-btn">edit</button>
        <button className="delete-btn">delete</button>
      </div>
    </div>
  );
};

export default NoteComponent;