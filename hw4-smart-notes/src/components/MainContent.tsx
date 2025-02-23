import React, { useState } from 'react';
import NotesSection from './Notes/NotesSection';
import TagsSection from './Tags/TagsSection';

export default function MainContent() {
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [isTagModalOpen, setTagModalOpen] = useState(false);
  const [noteFilter, setNoteFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <div className="app">
      <NotesSection
        noteFilter={noteFilter}
        setNoteFilter={setNoteFilter}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        isModalOpen={isNoteModalOpen}
        setModalOpen={setNoteModalOpen} />
      <TagsSection
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        isModalOpen={isTagModalOpen}
        setModalOpen={setTagModalOpen} />
    </div>
  );
}