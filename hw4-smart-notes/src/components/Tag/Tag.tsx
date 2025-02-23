import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tag } from '../../types/Tag';
import TagModal from '../Modal/TagModal';

interface TagProps {
  tag: Tag;
}

const TagComponent: React.FC<TagProps> = ({ tag }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  return (
    <div className="tag">
      <span>{tag.name} ({tag.count})</span>
      <button className="edit-btn" onClick={() => setEditModalOpen(true)}>E</button>
      <TagModal 
        open={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)}
        tag={tag}
        mode="edit"
      />
    </div>
  );
};

export default TagComponent;