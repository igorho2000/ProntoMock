import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../features/projectSlice'
import popupReducer from '../features/popupSlice'


export const store = configureStore({
  reducer: {
    project: projectReducer,
    popup: popupReducer,
  },
});
