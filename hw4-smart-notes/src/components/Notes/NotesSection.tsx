import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import NoteComponent from '../Note/Note';
import NoteModal from '../Modal/NoteModal';
import { NotesSectionProps } from '../../models/props/NotesSectionProps';
import { Note } from '../../models/Note';
import { Tag } from '../../models/Tag';

const SearchBar: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search by the keyword"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const TagFilter: React.FC<{
  value: string | null;
  onChange: (value: string | null) => void;
  tags: Tag[];
}> = ({ value, onChange, tags }) => (
  <select 
    value={value || ''} 
    onChange={(e: ChangeEvent<HTMLSelectElement>) => 
      onChange(e.target.value === '' ? null : e.target.value)}
  >
    <option value="">All Tags</option>
    {tags.map((tag) => (
      <option key={tag.id} value={tag.id}>{tag.name}</option>
    ))}
  </select>
);

const NotesList: React.FC<{
  notes: Note[];
}> = ({ notes }) => (
  <>
    {notes.map((note) => (
      <NoteComponent key={note.id} note={note} />
    ))}
  </>
);

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

  const filteredNotes = notes.filter((note: Note) => {
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
        <SearchBar value={noteFilter} onChange={setNoteFilter} />
        <TagFilter 
          value={selectedTag} 
          onChange={setSelectedTag}
          tags={tags}
        />
      </div>
      <NotesList notes={filteredNotes} />
      <NoteModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default NotesSection; 