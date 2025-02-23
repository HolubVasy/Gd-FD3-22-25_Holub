import React from 'react';
import { useSelector } from 'react-redux';
import TagComponent from '../Tag/Tag';
import TagModal from '../Modal/TagModal';

interface TagsSectionProps {
  tagFilter: string;
  setTagFilter: (filter: string) => void;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const TagsSection: React.FC<TagsSectionProps> = ({
  tagFilter,
  setTagFilter,
  isModalOpen,
  setModalOpen
}) => {
  const tags = useSelector((state: any) => state.tags);

  const filteredTags = tags.filter((tag: any) =>
    tagFilter === '' || tag.name.toLowerCase().includes(tagFilter.toLowerCase())
  );

  return (
    <div className="tags-section">
      <div className="section-header">
        <h2>Tags ({tags.length})</h2>
        <button onClick={() => setModalOpen(true)}>Add Tag</button>
      </div>
      <input
        type="text"
        placeholder="Search by the keyword"
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
      />
      {filteredTags.map((tag: any) => (
        <TagComponent key={tag.id} tag={tag} />
      ))}
      <TagModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default TagsSection; 