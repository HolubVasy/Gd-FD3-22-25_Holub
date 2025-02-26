import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAlbums } from '../../store/slices/albumsSlice';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import styles from './AlbumsPage.module.css';

const AlbumsPage = () => {
  const { items: albums, loading, error } = useSelector((state: RootState) => state.albums);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Albums</h1>
      <div className={styles.grid}>
        {albums.map(album => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage; 