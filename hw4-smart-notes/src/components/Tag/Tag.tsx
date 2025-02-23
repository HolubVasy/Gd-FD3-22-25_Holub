import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TagProps } from '../../models/props/TagProps';
import TagModal from '../Modal/TagModal';

export default function TagComponent({ tag }: TagProps) {
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const notes = useSelector((state: any) => state.notes);

  const hasRelatedNotes = notes.some((note: any) => note.tagId === tag.id);

  const handleDelete = () => {
    if (!hasRelatedNotes) {
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
        mode="edit" />
    </div>
  );
}