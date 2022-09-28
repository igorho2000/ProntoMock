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
            width: 1,
            height: 2,
            x: 3,
            y: 4,
            rotate: 5,
            radius: [0,0,0,0],
            differentRadius: false,
            zIndex: 1,
            bold: true,
            underline: false,
            italic: false,
            size: 26,
            textAlign: 'left',
            font: 'Sans Serif',
            textColor: [0,0,0,1],
            fillColor: [0,0,0,1],
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: [0,0,0,1],
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
            
        },
        ChangeSelectedProperties: (state, action) => {
            // payload is an array where 0=property name and 1=new value
            state.selectedObject.map((item) => {
                item[action.payload[0]] = action.payload[1];
            })
            console.log(action.payload)
        }
    },
});

export const {ChangeCanvasProperties, ChangeSelectedProperties} = draftSlice.actions;

export const selectDraft = (state) => state.draft;

export default draftSlice.reducer;