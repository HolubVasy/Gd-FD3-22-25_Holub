import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { useDispatch } from 'react-redux';
import { Tag } from '../../types/Tag';
import { addTag } from '../../store/tagsSlice';
import 'react-responsive-modal/styles.css';

interface TagModalProps {
  open: boolean;
  onClose: () => void;
  tag?: Tag;
  mode?: 'edit' | 'add';
}

const TagModal: React.FC<TagModalProps> = ({ open, onClose, tag, mode = 'add' }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(tag?.name || '');

  const handleSave = () => {
    if (mode === 'edit' && tag) {
      dispatch({
        type: 'tags/editTag',
        payload: {
          id: tag.id,
          name
        }
      });
    } else if (mode === 'add' && name.trim()) {
      dispatch(addTag(name.trim()));
    }
    setName(''); // Reset the input
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Modal open={open} onClose={onClose} center>
      <div className="modal-content">
        <h2>{mode === 'edit' ? 'Edit Tag' : 'Add Tag'}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter tag name"
          autoFocus
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} disabled={!name.trim()}>Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default TagModal; 