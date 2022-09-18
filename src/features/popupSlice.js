import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = {
    everyPopup: {
        AccountDrop: [false],
        ProjectDrop: [false],
        DraftDrop: [false, false, false, false]
    },
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        resetPopups: (state) => {
            var draftpopup = Array(state.everyPopup.DraftDrop.length).fill(false);
            state.everyPopup.AccountDrop = [false];
            state.everyPopup.ProjectDrop = [false];
            state.everyPopup.DraftDrop = draftpopup;
        },
        showPopup: (state, action) => {
            var popupType = action.payload[0];
            var popupIndex = action.payload[1];
            state.everyPopup[popupType][popupIndex] = true;
        },
    },
});

export const {resetPopups, showPopup} = popupSlice.actions;

export const selectEveryPopup = (state) => state.popup.everyPopup;

export default popupSlice.reducer;