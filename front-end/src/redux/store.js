import { configureStore } from '@reduxjs/toolkit';
import favouritesSlice from './slice'; // Import your Redux slice

export default configureStore({
  reducer: {
    favourites: favouritesSlice, // Use your slice as the reducer
  },
});