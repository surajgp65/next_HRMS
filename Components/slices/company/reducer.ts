import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  company: "",
  isEdit: false,
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
      state.isEdit = true;
      state.loading = false;
    },
  },
});

export const { apiError, updateCompany } = companySlice.actions;

export default companySlice.reducer;
