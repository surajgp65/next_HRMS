
export {
    changeLayout,
    changeSidebarTheme,
    changeLayoutMode,
    changeLayoutWidth,
    changeLayoutPosition,
    changeTopbarTheme,
    changeLeftsidebarSizeType,
    changeLeftsidebarViewType,
    changeSidebarImageType,
    changePreLoader,
} from "./layouts/thunk";

// export {
//     getEvents,
//     addNewEvent,
//     updateEvent,
//     deleteEvent,
//     getCategories,
//     getUpCommingEvent,
//     resetCalendar
// } from "./calendar/thunk";

// export { getAPIKey, addNewAPIKey, updateAPIKey, deleteAPIKey } from "./apiKey/thunk";

// export { getContacts, addNewContact, updateContact, deleteContact } from "./contact/thunk";

// export { loginUser, logoutUser, socialLogin, resetLoginFlag } from "./auth/login/thunk";

export { registerUser, resetRegisterFlag, apiError } from "./auth/register/thunk";

// export { userForgetPassword } from "./auth/forgetpwd/thunk";

// export { editProfile, resetProfileFlag } from "./auth/profile/thunk";

// export { getTeam, addNewMember, updateMember, deleteMember } from "./team/thunk";

// export { getChartData } from "./dashboard/thunk";