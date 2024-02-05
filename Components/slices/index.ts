import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

// Front
import LayoutReducer from "./layouts/reducer";
// import calendarSlice from "./calendar/reducer";
// import APIKeyslice from "./apiKey/reducer";
// import contactslice from "./contact/reducer"
// import teamslice from "./team/reducer"
// import dashboardslice from "./dashboard/reducer"

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
import GroupReducer from "./group/reducer";
import CompanyReducer from "./company/reducer";
import BranchReducer from "./branch/reducer";
import LeaveReducer from "./leaves/reducer";
import LeaveStructureReducer from "./leaveStructure/reducer";
import EmployeeDetailReducer from "./employeeDetail/reducer"
import AttendanceReducer from "./attendance/reducer";

const combinedReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  Group: GroupReducer,
  Company: CompanyReducer,
  Branch: BranchReducer,
  Leave: LeaveReducer,
  LeaveStructure: LeaveStructureReducer,
  EmployeeDetail: EmployeeDetailReducer,
  Attendance: AttendanceReducer,
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
  });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: false });
