import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    draftSettings: {
        name: 'First Draft',
        date: '9/22/2022',
    },
    canvasSettings: {
        size: 'A4',
        unit: 'mm',
        width: 0,
        height: 0,
        margin: [0,0,0,0],
        differentMargin: false,
        fillColor: [0,0,0,1]
    },
    everyObject: {

    },
    selectedObject: [
        {
            type: 'text',
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            rotate: 0,
            radius: [0,0,0,0],
            differentRadius: false,
            zIndex: 1,
            bold: false,
            underline: false,
            italic: false,
            textHorizontalAlign: 'left',
            textVerticalAlign: 'top',
            font: 'Sans Serif',
            textColor: 'rgba(0,0,0,1)',
            fillColor: 'rgba(0,0,0,1)',
            borderStyle: ['none', 'none', 'none', 'none'],
            borderWidth: [0,0,0,0],
            borderColor: ['rgba(0,0,0,1)','rgba(0,0,0,1)','rgba(0,0,0,1)','rgba(0,0,0,1)'],
            differentBorder: false
        },
    ],
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
        ChangeCanvasProperties: (state, action) => {
            // payload is an array where 0=property name and 1=new value
            state.canvasSettings[action.payload[0]] = action.payload[1];
            console.log(action.payload)
        },
        ChangeSelectedProperties: (state, action) => {
            // payload is an array where 0=property name and 1=new value
            state.selectedObject = state.selectedObject.map((item) => {
                item[action.payload[0]] = action.payload[1];
            })
        }
    },
});

export const {ChangeCanvasProperties, ChangeSelectedProperties} = draftSlice.actions;

export const selectDraft = (state) => state.draft;

export default draftSlice.reducer;