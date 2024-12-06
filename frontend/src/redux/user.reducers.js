import { createSlice } from "@reduxjs/toolkit";

// Retrieve user from localStorage or set to null if not available
const savedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const userSlice = createSlice({
  name: "user", // Corrected name to reflect it's for user state
  initialState: {
    user: savedUser, // Initialize state with the user from localStorage
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // Save the updated user to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      // Remove user from localStorage when cleared
      localStorage.removeItem("user");
    },
  },
});

// Export actions for use in components
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer to add it to the store
export default userSlice.reducer;
