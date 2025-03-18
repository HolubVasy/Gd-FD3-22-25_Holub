import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { auth } from '../services/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { 
  setUser, 
  setLoading, 
  setError, 
  logout as logoutAction
} from '../redux/slices/authSlice';
import { User } from '../types/types';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  const login = useCallback(async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const userData: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        displayName: userCredential.user.displayName || '',
        photoURL: userCredential.user.photoURL || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      dispatch(setUser(userData));
      toast.success('Successfully logged in');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to login';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const register = useCallback(async (email: string, password: string, displayName: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile to set display name
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
      
      const userData: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        displayName: displayName,
        photoURL: userCredential.user.photoURL || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      dispatch(setUser(userData));
      toast.success('Successfully registered');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      await signOut(auth);
      dispatch(logoutAction());
      toast.success('Successfully logged out');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to logout';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const updateUserProfile = useCallback(async (displayName: string, photoURL?: string) => {
    try {
      dispatch(setLoading(true));
      if (!auth.currentUser) {
        throw new Error('No user is logged in');
      }
      
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoURL || auth.currentUser.photoURL
      });
      
      if (user) {
        const updatedUser: User = {
          ...user,
          displayName,
          photoURL: photoURL || user.photoURL || '',
          updatedAt: new Date().toISOString()
        };
        
        dispatch(setUser(updatedUser));
      }
      
      toast.success('Profile updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, user]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateUserProfile
  };
}; 