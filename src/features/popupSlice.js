import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = {
    everyPopup: {
        AccountDrop: [],
        ProjectDrop: [],
        DraftDrop: [],
        StarDraftDrop: [],
        DraftMove: [],
        StarredDraftMove: [],
        DraftRename: [],
        StarredDraftRename: [],
        NewDraft: [],
        ProjectSettings: [],
        NewProject: [],
    },
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        resetPopups: (state) => {
            var draftpopup = Array(state.everyPopup.DraftDrop.length).fill(false);
            var stardraftpopup = Array(state.everyPopup.StarDraftDrop.length).fill(false);
            state.everyPopup.AccountDrop = [false];
            state.everyPopup.ProjectDrop = [false];
            state.everyPopup.DraftDrop = [false];
            state.everyPopup.StarDraftDrop = [false];
            state.everyPopup.DraftMove = [false];
            state.everyPopup.StarredDraftMove = [false];
            state.everyPopup.DraftRename = [false];
            state.everyPopup.StarredDraftRename = [false];
            state.everyPopup.NewDraft = [false];
            state.everyPopup.ProjectSettings = [false];
            state.everyPopup.NewProject = [false];
        },
        showPopup: (state, action) => {
            var popupType = action.payload[0];
            var popupIndex = action.payload[1];
            state.everyPopup[popupType][popupIndex] = true;
        },
    },
});

export const {resetPopups, showPopup,} = popupSlice.actions;

export const selectEveryPopup = (state) => state.popup.everyPopup;

export default popupSlice.reducer;