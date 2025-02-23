import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { useDispatch } from 'react-redux';
import { Tag } from '../../models/Tag';
import { TagModalProps } from '../../models/props/TagModalProps';
import { addTag } from '../../store/tagsSlice';
import 'react-responsive-modal/styles.css';

const EditMode: React.FC<{
  name: string;
  mode: 'edit' | 'add';
  onNameChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}> = ({
  name,
  mode,
  onNameChange,
  onSave,
  onClose
}) => (
  <div className="modal-content">
    <h2>{mode === 'edit' ? 'Edit Tag' : 'Add Tag'}</h2>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSave()}
        placeholder="Enter tag name"
        autoFocus
      />
    </div>
    <div className="modal-actions">
      <button onClick={onClose}>Cancel</button>
      <button 
        onClick={onSave}
        disabled={!name.trim()}
      >
        Save
      </button>
    </div>
  </div>
);

const TagModal: React.FC<TagModalProps> = ({ open, onClose, tag, mode = 'add' }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(tag?.name || '');

  useEffect(() => {
    setName(tag?.name || '');
  }, [tag]);

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
    setName('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} center>
      <EditMode
        name={name}
        mode={mode}
        onNameChange={setName}
        onSave={handleSave}
        onClose={onClose}
      />
    </Modal>
  );
};

export default TagModal; 