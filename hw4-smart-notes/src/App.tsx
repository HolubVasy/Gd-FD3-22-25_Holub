import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import NoteComponent from './components/Note/Note';
import TagComponent from './components/Tag/Tag';
import NoteModal from './components/Modal/NoteModal';
import TagModal from './components/Modal/TagModal';

const App: React.FC = () => {
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [isTagModalOpen, setTagModalOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="app">
        <div className="notes-section">
          <button onClick={() => setNoteModalOpen(true)}>Add Note</button>
          {/* Render notes */}
        </div>
        <div className="tags-section">
          <button onClick={() => setTagModalOpen(true)}>Add Tag</button>
          {/* Render tags */}
        </div>
        <NoteModal open={isNoteModalOpen} onClose={() => setNoteModalOpen(false)} />
        <TagModal open={isTagModalOpen} onClose={() => setTagModalOpen(false)} />
      </div>
    </Provider>
  );
};

export default App;
