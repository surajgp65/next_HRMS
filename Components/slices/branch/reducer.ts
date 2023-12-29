import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  branch: "",
  isEdit: false,
  error: "",
  loading: false,
};

const BranchSlice = createSlice({
  name: "Branch",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateBranch(state, action) {
      state.branch = action.payload;
      state.isEdit = true;
      state.loading = false;
    },
  },
});

export const { apiError, updateBranch } = BranchSlice.actions;

export default BranchSlice.reducer;
