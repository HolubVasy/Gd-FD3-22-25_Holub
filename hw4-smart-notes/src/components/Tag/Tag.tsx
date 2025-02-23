import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tag } from '../../types/Tag';
import TagModal from '../Modal/TagModal';

interface TagProps {
  tag: Tag;
}

const TagComponent: React.FC<TagProps> = ({ tag }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const notes = useSelector((state: any) => state.notes);
  
  const hasRelatedNotes = notes.some((note: any) => note.tagId === tag.id);

  const handleDelete = () => {
    if (hasRelatedNotes) {
      alert('Cannot delete tag that has related notes');
      return;
    }
    if (window.confirm('Are you sure you want to delete this tag?')) {
      dispatch({ type: 'tags/deleteTag', payload: tag.id });
    }
  };

  return (
    <div className="tag">
      <span>{tag.name} ({tag.count})</span>
      <div className="tag-actions">
        <button className="action-btn" onClick={() => setEditModalOpen(true)}>edit</button>
        <button 
          className="action-btn delete-btn" 
          onClick={handleDelete}
          disabled={hasRelatedNotes}
          title={hasRelatedNotes ? "Cannot delete tag with related notes" : "Delete tag"}
        >
          delete
        </button>
      </div>
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