import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  favourites: [],
};

// Create a slice
const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addTofavourites: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFromfavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (item) => item.trackId !== action.payload
      );
    },
  },
});

// Export the action creators
export const { addTofavourites, removeFromfavourites } = favouritesSlice.actions;

// Export the reducer
export default favouritesSlice.reducer;

