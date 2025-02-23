import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import NoteComponent from './Note';
import NoteModal from '../Modal/NoteModal';

interface NotesSectionProps {
  noteFilter: string;
  setNoteFilter: (filter: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tagId: string | null) => void;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  noteFilter,
  setNoteFilter,
  selectedTag,
  setSelectedTag,
  isModalOpen,
  setModalOpen
}) => {
  const notes = useSelector((state: any) => state.notes);
  const tags = useSelector((state: any) => state.tags);

  const filteredNotes = notes.filter((note: any) => {
    const matchesFilter = noteFilter === '' || 
      note.title?.toLowerCase().includes(noteFilter.toLowerCase()) ||
      note.text.toLowerCase().includes(noteFilter.toLowerCase());
    const matchesTag = selectedTag === null || note.tagId === selectedTag;
    return matchesFilter && matchesTag;
  });

  return (
    <div className="notes-section">
      <div className="section-header">
        <h2>Notes ({filteredNotes.length})</h2>
        <button onClick={() => setModalOpen(true)}>Add Note</button>
      </div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by the keyword"
          value={noteFilter}
          onChange={(e) => setNoteFilter(e.target.value)}
        />
        <select 
          value={selectedTag || ''} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => 
            setSelectedTag(e.target.value === '' ? null : e.target.value)}
        >
          <option value="">Select tag</option>
          {tags.map((tag: any) => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
      </div>
      {filteredNotes.map((note: any) => (
        <NoteComponent key={note.id} note={note} />
      ))}
      <NoteModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default NotesSection; 