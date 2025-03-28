// src/pages/Tag/Tags.tsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Tag } from '../../types/models';
import { TagService } from '../../api/TagService';

const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    TagService.getTags()
      .then(setTags)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Tags
      </Typography>
      <List>
        {tags.map(tag => (
          <ListItem key={tag.id} component={Link} to={`/tags/${tag.id}`}>
            <ListItemText primary={tag.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Tags;
