import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../features/projectSlice'
import popupReducer from '../features/popupSlice';
import draftReducer from '../features/draftSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    popup: popupReducer,
    draft: draftReducer,
    user: userReducer
  },
});
