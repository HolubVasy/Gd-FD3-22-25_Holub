import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import AlbumsPage from './pages/AlbumsPage/AlbumsPage';
import AlbumDetailPage from './pages/AlbumDetailPage/AlbumDetailPage';
import UsersPage from './pages/UsersPage/UsersPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import RandomPhotoPage from './pages/RandomPhotoPage/RandomPhotoPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/albums" element={<AlbumsPage />} />
            <Route path="/albums/:id" element={<AlbumDetailPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserProfilePage />} />
            <Route path="/random-photo" element={<RandomPhotoPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App; 