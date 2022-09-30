import { createSlice } from '@reduxjs/toolkit';
import { paperSizes } from './paperSizes';

const initialState = {
    draftSettings: {
        name: 'First Draft',
        date: '9/22/2022',
    },
    canvasSettings: {
        size: 'Custom',
        unit: 'mm',
        width: 100,
        height: 200,
        margin: [10,10,10,10],
        differentMargin: false,
        fillColor: [255,255,255,1]
    },
    everyObject: {

    },
    selectedObject: [
        {
            type: 'Text',
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
        selected: 'Text',
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
        },
        SetDraftSize: (state, action) => {
            // payload is a string of the paper size
            if (action.payload === 'Custom') {
                return
            } 
            state.canvasSettings.size = action.payload;
            state.canvasSettings.width = paperSizes[action.payload][0];
            state.canvasSettings.height = paperSizes[action.payload][1];
        },
        SelectObject: (state, action) => {
            // payload is the index of the element selected
            var toSelected = state.everyObject.splice(action.payload, 1)

            if (state.statistics.selected === 'none') {
                state.statistics.selected = toSelected.type;
                return
            } 
            if (state.statistics.selected === toSelected.type) {
                if (state.statistics.selected[-1] === 's') {
                    return
                }
                state.statistics.selected += 's'
            }
            state.statistics.selected = 'Selected';
        },
        DeselectObject: (state) => {
            state.everyObject = state.everyObject.concat(state.selectedObject);
            state.selectedObject = [];
            state.statistics.selected = 'none';
        }
    },
});

export const {ChangeCanvasProperties, ChangeSelectedProperties, SetDraftSize} = draftSlice.actions;

export const selectDraft = (state) => state.draft;

export default draftSlice.reducer;