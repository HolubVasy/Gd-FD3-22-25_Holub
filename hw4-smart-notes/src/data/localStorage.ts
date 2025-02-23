import { Note } from '../models/Note';
import { Tag } from '../models/Tag';

type StorageKey = 'notes' | 'tags';
type StorageData = Note[] | Tag[];

class LocalStorageManager {
  private static convertDates(data: StorageData, key: StorageKey): StorageData {
    if (key === 'notes') {
      return (data as Note[]).map(note => ({
        ...note,
        created: new Date(note.created),
        updated: new Date(note.updated)
      }));
    }
    return data;
  }

  static loadState(key: StorageKey): StorageData | undefined {
    try {
      const serializedState = localStorage.getItem(key);
      if (!serializedState) {
        return undefined;
      }
      const data = JSON.parse(serializedState);
      return this.convertDates(data, key);
    } catch (err) {
      console.error(`Error loading ${key} from localStorage:`, err);
      return undefined;
    }
  }

  static saveState(key: StorageKey, state: StorageData): void {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error(`Error saving ${key} to localStorage:`, err);
    }
  }
}

export const { loadState, saveState } = LocalStorageManager;