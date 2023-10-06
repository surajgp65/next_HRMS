import { createSlice } from "@reduxjs/toolkit";
//constants
import {
  LAYOUT_TYPES,
  LAYOUT_MODE_TYPES,
  LAYOUT_SIDEBAR_TYPES,
  LAYOUT_WIDTH_TYPES,
  LAYOUT_POSITION_TYPES,
  LAYOUT_TOPBAR_THEME_TYPES,
  LEFT_SIDEBAR_SIZE_TYPES,
  LEFT_SIDEBAR_VIEW_TYPES,
  LEFT_SIDEBAR_IMAGE_TYPES,
  PERLOADER_TYPES
} from "../../Common/constants/layout";

export interface LayoutState {
  layoutType: LAYOUT_TYPES.VERTICAL | LAYOUT_TYPES.HORIZONTAL | LAYOUT_TYPES.TWOCOLUMN;
  layoutModeType: LAYOUT_MODE_TYPES.LIGHTMODE | LAYOUT_MODE_TYPES.DARKMODE;
  leftSidebarType: LAYOUT_SIDEBAR_TYPES.LIGHT | LAYOUT_SIDEBAR_TYPES.DARK | LAYOUT_SIDEBAR_TYPES.GRADIENT | LAYOUT_SIDEBAR_TYPES.GRADIENT_2 | LAYOUT_SIDEBAR_TYPES.GRADIENT_3 | LAYOUT_SIDEBAR_TYPES.GRADIENT_4;
  layoutWidthType: LAYOUT_WIDTH_TYPES.FLUID | LAYOUT_WIDTH_TYPES.BOXED;
  layoutPositionType: LAYOUT_POSITION_TYPES.FIXED | LAYOUT_POSITION_TYPES.SCROLLABLE;
  topbarThemeType: LAYOUT_TOPBAR_THEME_TYPES.LIGHT | LAYOUT_TOPBAR_THEME_TYPES.DARK;
  leftsidbarSizeType: LEFT_SIDEBAR_SIZE_TYPES.DEFAULT | LEFT_SIDEBAR_SIZE_TYPES.COMPACT | LEFT_SIDEBAR_SIZE_TYPES.SMALLICON | LEFT_SIDEBAR_SIZE_TYPES.SMALLHOVER;
  leftSidebarViewType: LEFT_SIDEBAR_VIEW_TYPES.DEFAULT | LEFT_SIDEBAR_VIEW_TYPES.DETACHED;
  leftSidebarImageType: LEFT_SIDEBAR_IMAGE_TYPES.NONE | LEFT_SIDEBAR_IMAGE_TYPES.IMG1 | LEFT_SIDEBAR_IMAGE_TYPES.IMG2 | LEFT_SIDEBAR_IMAGE_TYPES.IMG3 | LEFT_SIDEBAR_IMAGE_TYPES.IMG4;
  preloader: PERLOADER_TYPES.ENABLE | PERLOADER_TYPES.DISABLE;
}

export const initialState: LayoutState = {
  layoutType: LAYOUT_TYPES.VERTICAL,
  layoutModeType: LAYOUT_MODE_TYPES.LIGHTMODE,
  leftSidebarType: LAYOUT_SIDEBAR_TYPES.LIGHT,
  layoutWidthType: LAYOUT_WIDTH_TYPES.FLUID,
  layoutPositionType: LAYOUT_POSITION_TYPES.FIXED,
  topbarThemeType: LAYOUT_TOPBAR_THEME_TYPES.LIGHT,
  leftsidbarSizeType: LEFT_SIDEBAR_SIZE_TYPES.DEFAULT,
  leftSidebarViewType: LEFT_SIDEBAR_VIEW_TYPES.DEFAULT,
  leftSidebarImageType: LEFT_SIDEBAR_IMAGE_TYPES.NONE,
  preloader: PERLOADER_TYPES.DISABLE
};

const LayoutSlice = createSlice({
  name: 'LayoutSlice',
  initialState,
  reducers: {
    changeLayoutAction(state: any, action) {
      state.layoutType = action.payload;
    },
    changeLayoutModeAction(state: any, action) {
      state.layoutModeType = action.payload;
    },
    changeSidebarThemeAction(state: any, action) {
      state.leftSidebarType = action.payload;
    },
    changeLayoutWidthAction(state: any, action) {
      state.layoutWidthType = action.payload;
    },
    changeLayoutPositionAction(state: any, action) {
      state.layoutPositionType = action.payload;
    },
    changeTopbarThemeAction(state: any, action) {
      state.topbarThemeType = action.payload;
    },
    changeLeftsidebarSizeTypeAction(state: any, action) {
      state.leftsidbarSizeType = action.payload;
    },
    changeLeftsidebarViewTypeAction(state: any, action) {
      state.leftSidebarViewType = action.payload;
    },
    changeSidebarImageTypeAction(state: any, action) {
      state.leftSidebarImageType = action.payload;
    },
    changePreLoaderAction(state: any, action) {
      state.preloader = action.payload;
    }
  }
});

export const {
  changeLayoutAction,
  changeLayoutModeAction,
  changeSidebarThemeAction,
  changeLayoutWidthAction,
  changeLayoutPositionAction,
  changeTopbarThemeAction,
  changeLeftsidebarSizeTypeAction,
  changeLeftsidebarViewTypeAction,
  changeSidebarImageTypeAction,
  changePreLoaderAction
} = LayoutSlice.actions;

export default LayoutSlice.reducer;