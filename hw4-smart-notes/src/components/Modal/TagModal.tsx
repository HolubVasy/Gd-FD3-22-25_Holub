import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { useDispatch } from 'react-redux';
import { TagModalProps } from '../../models/props/TagModalProps';
import { addTag } from '../../store/tagsSlice';
import 'react-responsive-modal/styles.css';
import { TagEditModeProps } from '../../models/props/TagEditModeProps';

function EditMode({ name, mode, onNameChange, onSave, onClose }: TagEditModeProps) {
  return (
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
          autoFocus />
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
}

function TagModal({ open, onClose, tag, mode = 'add' }: TagModalProps) {
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
        onClose={onClose} />
    </Modal>
  );
}

export default TagModal; 