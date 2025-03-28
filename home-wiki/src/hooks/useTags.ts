import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { tagService } from '../services/tagService';
import {
  setTags,
  addTag,
  updateTag,
  deleteTag,
  setLoading,
  setError,
  setSearchQuery,
} from '../redux/slices/tagSlice';
import { toast } from 'react-toastify';

export const useTags = () => {
  const dispatch = useDispatch();
  const { tags, loading, error, searchQuery } = useSelector((state: RootState) => state.tags);

  const fetchTags = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await tagService.getTags();
      dispatch(setTags(data));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch tags'));
      toast.error('Failed to fetch tags');
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const searchTagsByKeyword = useCallback(
    async (keyword: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(setSearchQuery(keyword));
        const data = await tagService.searchTags(keyword);
        dispatch(setTags(data));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to search tags'));
        toast.error('Failed to search tags');
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const createTag = useCallback(
    async (name: string) => {
      try {
        dispatch(setLoading(true));
        const newTag = await tagService.createTag(name);
        dispatch(addTag(newTag));
        toast.success('Tag created successfully');
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to create tag'));
        toast.error('Failed to create tag');
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const updateTagName = useCallback(
    async (id: string, name: string) => {
      try {
        dispatch(setLoading(true));
        const updatedTag = await tagService.updateTag(id, name);
        dispatch(updateTag(updatedTag));
        toast.success('Tag updated successfully');
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to update tag'));
        toast.error('Failed to update tag');
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const removeTag = useCallback(
    async (id: string) => {
      try {
        dispatch(setLoading(true));
        const canDelete = await tagService.canDeleteTag(id);
        if (!canDelete) {
          toast.error('Cannot delete tag: it is being used in articles');
          return;
        }
        await tagService.deleteTag(id);
        dispatch(deleteTag(id));
        toast.success('Tag deleted successfully');
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to delete tag'));
        toast.error('Failed to delete tag');
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return {
    tags,
    loading,
    error,
    searchQuery,
    fetchTags,
    searchTagsByKeyword,
    createTag,
    updateTagName,
    removeTag,
  };
};
