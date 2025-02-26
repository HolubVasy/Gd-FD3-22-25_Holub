import { Link } from 'react-router-dom';
import { Album } from '../../types/models';
import styles from './AlbumCard.module.css';

type AlbumCardProps = {
  album: Album;
  thumbnailUrl?: string;
}

const AlbumCard = ({ album, thumbnailUrl }: AlbumCardProps) => {
  return (
    <Link to={`/albums/${album.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={album.title} />
        ) : (
          <div className={styles.placeholder}>No Image</div>
        )}
      </div>
      <h3 className={styles.title}>{album.title}</h3>
    </Link>
  );
};

export default AlbumCard; 