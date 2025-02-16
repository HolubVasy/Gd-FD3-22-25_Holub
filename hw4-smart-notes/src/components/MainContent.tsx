import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import NoteComponent from './Note/Note';
import TagComponent from './Tag/Tag';
import NoteModal from './Modal/NoteModal';
import TagModal from './Modal/TagModal';

const MainContent: React.FC = () => {
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [isTagModalOpen, setTagModalOpen] = useState(false);
  const [noteFilter, setNoteFilter] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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
    <div className="app">
      <div className="notes-section">
        <div className="section-header">
          <h2>Notes ({filteredNotes.length})</h2>
          <button onClick={() => setNoteModalOpen(true)}>Add Note</button>
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
      </div>
      <div className="tags-section">
        <div className="section-header">
          <h2>Tags ({tags.length})</h2>
          <button onClick={() => setTagModalOpen(true)}>Add Tag</button>
        </div>
        <input
          type="text"
          placeholder="Search by the keyword"
        />
        {tags.map((tag: any) => (
          <TagComponent key={tag.id} tag={tag} />
        ))}
      </div>
      <NoteModal open={isNoteModalOpen} onClose={() => setNoteModalOpen(false)} />
      <TagModal open={isTagModalOpen} onClose={() => setTagModalOpen(false)} />
    </div>
  );
};

export default MainContent; 