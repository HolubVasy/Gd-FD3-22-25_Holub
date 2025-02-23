import React from 'react';
import { useSelector } from 'react-redux';
import TagComponent from '../Tag/Tag';
import TagModal from '../Modal/TagModal';
import { TagsSectionProps } from '../../models/props/TagsSectionProps';
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

const TagsList: React.FC<{
  tags: Tag[];
}> = ({ tags }) => (
  <>
    {tags.map((tag) => (
      <TagComponent key={tag.id} tag={tag} />
    ))}
  </>
);

const TagsSection: React.FC<TagsSectionProps> = ({
  tagFilter,
  setTagFilter,
  isModalOpen,
  setModalOpen
}) => {
  const tags = useSelector((state: any) => state.tags);

  const filteredTags = tags.filter((tag: Tag) =>
    tagFilter === '' || tag.name.toLowerCase().includes(tagFilter.toLowerCase())
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
};

export default TagsSection; 