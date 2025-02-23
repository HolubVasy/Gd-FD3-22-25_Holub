import React from 'react';
import { useSelector } from 'react-redux';
import TagComponent from '../Tag/Tag';
import TagModal from '../Modal/TagModal';
import { TagsSectionProps } from '../../models/props/TagsSectionProps';
import { Tag } from '../../models/Tag';
import { SearchBarProps } from '../../models/props/SearchBarProps';
import { TagsListProps } from '../../models/props/TagsListProps';

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search by the keyword"
      value={value}
      onChange={(e) => onChange(e.target.value)} />
  );
}

function TagsList({ tags }: TagsListProps) {
  return (
    <>
      {tags.map((tag) => (
        <TagComponent key={tag.id} tag={tag} />
      ))}
    </>
  );
}

export default function TagsSection({
  tagFilter, setTagFilter, isModalOpen, setModalOpen
}: TagsSectionProps) {
  const tags = useSelector((state: any) => state.tags);

  const filteredTags = tags.filter((tag: Tag) => tagFilter === '' || tag.name.toLowerCase().includes(tagFilter.toLowerCase())
  );

  return (
    <div className="tags-section">
      <div className="section-header">
        <h2>Tags ({tags.length})</h2>
        <button onClick={() => setModalOpen(true)}>Add Tag</button>
      </div>
      <SearchBar value={tagFilter} onChange={setTagFilter} />
      <TagsList tags={filteredTags} />
      <TagModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}