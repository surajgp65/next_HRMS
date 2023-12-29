import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  group: {},
  error: "",
  loading: false,
};

const companySlice = createSlice({
  name: "Group",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateGroup(state, action) {
      state.group = action.payload;
      state.loading = false;
    },
  },
});

export const { apiError, updateGroup } = companySlice.actions;

export default companySlice.reducer;
