import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendance: "",
  loading: false,
  error: false,
};

const attendanceSlice = createSlice({
  name: "Attendance",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateAttendance(state, action) {
      state.attendance = action.payload;
      state.loading = false;
    },
  },
});

export const { apiError, updateAttendance } = attendanceSlice.actions;

export default attendanceSlice.reducer;
