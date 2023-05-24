import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: "",
};

export const skillsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchSkillsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchSkillsFailure: (state, action) => {
      const error = action.payload;
      state.loading = false;
      state.error = error;
    },
    searchSkillsSuccess: (state, action) => {
      const items = action.payload;
      state.items = items;
      state.loading = false;
      state.error = null;
    },
    changeSearchField: (state, action) => {
      const search = action.payload;
      state.search = search;
    },
  },
});

export const {
  searchSkillsRequest,
  searchSkillsFailure,
  searchSkillsSuccess,
  changeSearchField,
} = skillsSlice.actions;

export default skillsSlice.reducer;
