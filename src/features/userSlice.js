import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: 'start',
    userProjects: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserState: (state, action) => {
            state.userInfo = action.payload;
        },
        changeUserProjects: (state, action) => {
            state.userProjects = action.payload;
        }
    },
});

export const {changeUserState, changeUserProjects} = userSlice.actions;

export const selectUser = (state) => state.user.userInfo;
export const selectProjectCodes = (state) => state.user.userProjects;

export default userSlice.reducer;