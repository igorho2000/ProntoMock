import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    draftSettings: {
        name: 'First Draft',
        date: '9/22/2022',
    },
    canvasSettings: {
        size: 'a4',
        unit: 'mm',
    },
    everyObject: {

    },
    selectedObject: {

    },
    savedVersions: {

    },
    statistics: {
        minZIndex: 10000000,
        maxZIndex: 10000000,
        objectNum: 0,
    }
}

export const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        
    },
});

export const {resetDrafts, showDraft,} = draftSlice.actions;

export const selectDraft = (state) => state.draft;

export default draftSlice.reducer;