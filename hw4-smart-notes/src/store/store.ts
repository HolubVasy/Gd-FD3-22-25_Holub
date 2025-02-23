import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
import tagsReducer from './tagsSlice';
import { loadState, saveState } from '../data/localStorage';
import { v4 as uuidv4 } from 'uuid';

const tagIds = {
  physics: uuidv4(),
  biology: uuidv4(),
  astronomy: uuidv4(),
  chemistry: uuidv4(),
  neuroscience: uuidv4()
};

const createNote = (text: string, tagId: string, title: string) => ({
  id: uuidv4(),
  tagId,
  title,
  text,
  created: new Date(),
  updated: new Date()
});

const initialNotes = [
  createNote(
    "Light takes 8 minutes and 20 seconds to travel from the Sun to Earth, covering a distance of about 93 million miles (150 million kilometers).",
    tagIds.physics,
    "Light takes..."
  ),
  createNote(
    "Human DNA shares 50% of its genetic makeup with bananas. This fascinating fact demonstrates the deep evolutionary connections between all living things on Earth.",
    tagIds.biology,
    "Human DNA sh..."
  ),
  createNote(
    "A day on Venus is longer than its year. Venus takes 243 Earth days to rotate on its axis (a day) but only 225 Earth days to orbit the Sun (a year).",
    tagIds.astronomy,
    "A day on Ve..."
  ),
  createNote(
    "Gold is edible. Pure gold (24k) is chemically inert and passes through the human digestive system without being absorbed into the body.",
    tagIds.chemistry,
    "Gold is edi..."
  ),
  createNote(
    "Your brain uses 20% of the total oxygen in your body and approximately 20% of the blood circulating in your body, despite being only 2% of your total body weight.",
    tagIds.neuroscience,
    "Your brain..."
  ),
  createNote(
    "A teaspoon of neutron star would weigh about 4 billion tons. Neutron stars are so dense that one sugar cube of neutron star material would have the mass of all humanity.",
    tagIds.physics,
    "A teaspoon..."
  ),
  createNote(
    "Octopuses have three hearts and blue blood. Two hearts pump blood to the gills, while the third circulates it to the rest of the body. Their blood is blue due to copper-based hemocyanin.",
    tagIds.biology,
    "Octopuses h..."
  ),
  createNote(
    "There are more trees on Earth than stars in the Milky Way. Our galaxy has between 100-400 billion stars, while Earth has over 3 trillion trees.",
    tagIds.astronomy,
    "There are m..."
  ),
  createNote(
    "Water can boil and freeze at the same time. This phenomenon is called the 'triple point,' where a substance exists as a gas, liquid, and solid simultaneously.",
    tagIds.chemistry,
    "Water can b..."
  ),
  createNote(
    "The human brain can generate about 23 watts of electrical power - enough to power a small LED light bulb. This energy comes from roughly 86 billion neurons firing constantly.",
    tagIds.neuroscience,
    "The human b..."
  )
];

const initialTags = [
  { id: tagIds.physics, name: 'Physics', count: 2 },
  { id: tagIds.biology, name: 'Biology', count: 2 },
  { id: tagIds.astronomy, name: 'Astronomy', count: 2 },
  { id: tagIds.chemistry, name: 'Chemistry', count: 2 },
  { id: tagIds.neuroscience, name: 'Neuroscience', count: 2 }
];

const savedNotes = loadState('notes');
const savedTags = loadState('tags');

const preloadedState = {
  notes: savedNotes || initialNotes,
  tags: savedTags || initialTags,
};

const store = configureStore({
  reducer: {
    notes: notesReducer,
    tags: tagsReducer,
  },
  preloadedState,
});

let saveTimeout: NodeJS.Timeout;
store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const state = store.getState();
    saveState('notes', state.notes);
    saveState('tags', state.tags);
  }, 1000); 
});

export default store;