import React from 'react';
import { Tag } from '../../types/Tag';

interface TagProps {
  tag: Tag;
}

const TagComponent: React.FC<TagProps> = ({ tag }) => {
  return (
    <div className="tag">
      <span>{tag.name} ({tag.count})</span>
      {/* Add buttons for edit, delete */}
    </div>
  );
};

export default TagComponent;