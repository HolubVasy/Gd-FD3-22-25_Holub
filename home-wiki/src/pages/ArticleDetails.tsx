import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { Article } from '#/types/models';

const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://homewiki.azurewebsites.net/api/article/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/articles/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      await axios.delete(`https://homewiki.azurewebsites.net/api/article/${id}`);
      navigate('/articles');
    } catch (error) {
      console.error('Error deleting article:', error);
      setError('Failed to delete article');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box p={3}>
        <Typography color="error">{error || 'Article not found'}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 3 }}
      >
        <Link 
          color="inherit" 
          href="/articles" 
          onClick={(e) => {
            e.preventDefault();
            navigate('/articles');
          }}
          sx={{ textDecoration: 'none' }}
        >
          Articles
        </Link>
        <Typography color="text.primary">{article.name}</Typography>
      </Breadcrumbs>

      <Paper 
        sx={{ 
          p: 3,
          backgroundColor: '#e0f2f1',
          borderRadius: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {article.name}
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{ mr: 1 }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
          {article.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Category:
          </Typography>
          <Chip 
            label={article.category?.name || 'Uncategorized'} 
            sx={{ backgroundColor: '#4db6ac', color: 'white' }}
          />
        </Box>

        {article.tags && article.tags.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Tags:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {article.tags.map((tag) => (
                <Chip 
                  key={tag.id} 
                  label={tag.name}
                  sx={{ backgroundColor: '#80cbc4' }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            Created by: {article.createdBy}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Created: {new Date(article.createdAt).toLocaleDateString()}
          </Typography>
          {article.modifiedBy && (
            <>
              <Typography variant="caption" color="text.secondary">
                Modified by: {article.modifiedBy}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Modified: {new Date(article.modifiedAt!).toLocaleDateString()}
              </Typography>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ArticleDetails;
