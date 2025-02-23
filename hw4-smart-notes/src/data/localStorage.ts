export const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    if (key === 'notes') {
      return state.map((note: any) => ({
        ...note,
        created: new Date(note.created),
        updated: new Date(note.updated)
      }));
    }
    return state;
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

export const saveState = (key: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};