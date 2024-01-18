import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  leave: "",
  compLeaves: "",
  error: "",
  loading: false,
};

const LeavesSlice = createSlice({
  name: "Leave",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateLeave(state, action) {
      state.leave = action.payload;
      state.loading = false;
    },
    updateCompLeave(state, action) {
      state.compLeaves = action.payload;
      state.loading = false;
    },
  },
});

export const { apiError, updateLeave, updateCompLeave } = LeavesSlice.actions;

export default LeavesSlice.reducer;
