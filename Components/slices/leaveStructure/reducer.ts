import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  leaveStructure: "",
  error: "",
  loading: false,
};

const LeavesStructue = createSlice({
  name: "LeaveStructure",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateLeaveStructure(state, action) {
      state.leaveStructure = action.payload;
      state.loading = false;
    },
  },
});

export const { apiError, updateLeaveStructure } = LeavesStructue.actions;

export default LeavesStructue.reducer;
