import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  company: "",
  holiday: "",
  error: "",
  loading: false,
};

const companySlice = createSlice({
  name: "Company",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateCompany(state, action) {
      state.company = action.payload;
      state.loading = false;
    },
    updateHoliday(state, action) {
      state.holiday = action.payload;
      state.loading = false;
    },
  },
});

export const { apiError, updateCompany, updateHoliday } = companySlice.actions;

export default companySlice.reducer;
