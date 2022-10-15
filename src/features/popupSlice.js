import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    everyPopup: {
        // Transition
        Transition: false,
        // Dashboard Popups
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
        // Editor Popups
        SelectedRightClick: [],
        CanvasRightClick: [],
        ImageUploader: [],
        Coordinates: [0, 0],
    },
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        resetPopups: (state) => {
            state.everyPopup.Transition = false;
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
            state.everyPopup.SelectedRightClick = [false];
            state.everyPopup.CanvasRightClick = [false];
            state.everyPopup.ImageUploader = [false];
        },
        showPopup: (state, action) => {
            var popupType = action.payload[0];
            var popupIndex = action.payload[1];
            state.everyPopup[popupType][popupIndex] = true;
        },
        transition: (state) => {
            state.everyPopup.Transition = true;
        },
        getCoordinates: (state, action) => {
            state.everyPopup.Coordinates[0] = action.payload[0];
            state.everyPopup.Coordinates[1] = action.payload[1];
        }
    },
});

export const {resetPopups, showPopup, transition, getCoordinates} = popupSlice.actions;

export const selectEveryPopup = (state) => state.popup.everyPopup;

export default popupSlice.reducer;