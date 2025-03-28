import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  Query,
} from 'firebase/firestore';
import { Article } from '../types/models';

const ARTICLES_COLLECTION = 'articles';
const PAGE_SIZE = 10;

export const api = {
  // Get articles with pagination and search
  async getArticles(page: number = 1, searchQuery: string = '', lastDoc?: QueryDocumentSnapshot) {
    try {
      let q: Query = collection(db, ARTICLES_COLLECTION);

      // Apply search filter if query exists
      if (searchQuery) {
        q = query(
          q,
          where('title', '>=', searchQuery),
          where('title', '<=', searchQuery + '\uf8ff')
        );
      }

      // Apply pagination
      q = query(q, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const articles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Article[];

      return {
        articles,
        lastDoc: snapshot.docs[snapshot.docs.length - 1],
        hasMore: snapshot.docs.length === PAGE_SIZE,
      };
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  // Get single article by ID
  async getArticleById(id: string) {
    try {
      const docRef = doc(db, ARTICLES_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Article not found');
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Article;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  },

  // Create new article
  async createArticle(article: Omit<Article, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, ARTICLES_COLLECTION), {
        ...article,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  },

  // Update article
  async updateArticle(id: string, article: Partial<Article>) {
    try {
      const docRef = doc(db, ARTICLES_COLLECTION, id);
      await updateDoc(docRef, {
        ...article,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  },

  // Delete article
  async deleteArticle(id: string) {
    try {
      const docRef = doc(db, ARTICLES_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  },
};
