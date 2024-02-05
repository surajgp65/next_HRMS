import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  employeeDetail: "",
  error: "",
  loading: false,
};

const EmployeeDetail = createSlice({
  name: "EmployeeDetail",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateEmployeeDetail(state, action) {
      state.employeeDetail = action.payload;
      state.loading = false;
    },
  },
});

export const { apiError, updateEmployeeDetail } = EmployeeDetail.actions;

export default EmployeeDetail.reducer;
