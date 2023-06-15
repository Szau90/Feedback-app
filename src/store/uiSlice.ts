import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  showDropdownMenu: boolean;
  showSecondDropdown: boolean;
  sortBy: string;
  category: string;
  status: string;
}

const initialState: UiState = {
  showDropdownMenu: false,
  showSecondDropdown: false,
  sortBy: "Most Upvotes",
  category: "Feature",
  status: "Suggestion",
};

const uiSlice = createSlice({
  name: "Ui",
  initialState,
  reducers: {
    toogleDropdown: (state) => {
      state.showDropdownMenu = !state.showDropdownMenu;
    },
    toogleSecondDropdown: (state) => {
      state.showSecondDropdown = !state.showSecondDropdown;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  toogleDropdown,
  toogleSecondDropdown,
  setSortBy,
  setCategory,
  setStatus,
} = uiSlice.actions;

export default uiSlice.reducer;
