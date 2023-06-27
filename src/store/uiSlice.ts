import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UiState {
  showDropdownMenu: boolean;
  showSecondDropdown: boolean;
  showMobileMenu: boolean;
  sortBy: string;
  category: string;
  status: string;
  commentInputLength: number;
}

const initialState: UiState = {
  showDropdownMenu: false,
  showSecondDropdown: false,
  showMobileMenu: false,
  sortBy: "Most Upvotes",
  category: "Feature",
  status: "suggestion",
  commentInputLength: 250,
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
    toogleMobileMenu: (state) => {
      state.showMobileMenu = !state.showMobileMenu;
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
    setInputCounter: (state, action: PayloadAction<number>) => {
      const chars = action.payload;
      state.commentInputLength = state.commentInputLength - chars;
    },
  },
});

export const {
  toogleDropdown,
  toogleSecondDropdown,
  toogleMobileMenu,
  setSortBy,
  setCategory,
  setStatus,
  setInputCounter,
} = uiSlice.actions;

export default uiSlice.reducer;
