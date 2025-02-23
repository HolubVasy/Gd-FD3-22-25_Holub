import { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { useDispatch, useSelector } from 'react-redux';
import { NoteModalProps } from '../../models/props/NoteModalProps';
import 'react-responsive-modal/styles.css';
import { EditModeProps } from '../../models/props/EditModeProps';
import { ViewModeProps } from '../../models/props/ViewModeProps';

function ViewMode({ note, onClose }: ViewModeProps) {
  return (
    <div className="modal-content">
      <h2>{note?.title}</h2>
      <p>{note?.text}</p>
      <div className="modal-actions">
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function EditMode({
  title, 
  description, 
  tagId, 
  mode, 
  tags, 
  onTitleChange, 
  onDescriptionChange, 
  onTagChange, 
  onSave, 
  onClose
}: EditModeProps) {
  return (
    <div className="modal-content">
      <h2>{mode === 'edit' ? 'Edit Note' : 'Add Note'}</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter title"
          autoFocus />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Enter description"
          rows={5} />
      </div>
      <div className="form-group">
        <label>Tag</label>
        <select
          value={tagId}
          onChange={(e) => onTagChange(e.target.value)}
        >
          <option value="">Select Tag</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
      </div>
      <div className="modal-actions">
        <button onClick={onClose}>Cancel</button>
        <button
          onClick={onSave}
          disabled={!title.trim() || !description.trim()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

function NoteModal({ open, onClose, note, mode = 'add' }: NoteModalProps) {
  const dispatch = useDispatch();
  const tags = useSelector((state: any) => state.tags);

  const [title, setTitle] = useState(note?.title || '');
  const [description, setDescription] = useState(note?.text || '');
  const [tagId, setTagId] = useState(note?.tagId || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setDescription(note?.text || '');
    setTagId(note?.tagId || '');
  }, [note]);

  const handleSave = () => {
    if (mode === 'edit' && note) {
      dispatch({
        type: 'notes/editNote',
        payload: {
          id: note.id,
          title,
          text: description,
          tagId
        }
      });
    } else if (mode === 'add') {
      dispatch({
        type: 'notes/addNote',
        payload: {
          title,
          text: description,
          tagId: tagId || null
        }
      });
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} center>
      {mode === 'view' && note ? (
        <ViewMode note={note} onClose={onClose} />
      ) : (
        <EditMode
          title={title}
          description={description}
          tagId={tagId}
          mode={mode === 'view' ? 'add' : mode}
          tags={tags}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onTagChange={setTagId}
          onSave={handleSave}
          onClose={onClose} />
      )}
    </Modal>
  );
}

export default NoteModal; 