import { createSlice } from '@reduxjs/toolkit';
import { paperSizes } from './paperSizes';

import { DegreeCalc } from '../Functions';

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
    everyObject: [
        {
            type: 'Square',
            width: 25,
            height: 25,
            x: 0,
            y: 0,
            rotate: 0,
            radius: [0,0,0,0],
            differentRadius: false,
            zIndex: 2,
            fillColor: [150,150,150,1],
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: [0,0,0,1],
        },
        {
            type: 'Text',
            value: `Hi, it's Igor`,
            width: 20,
            height: 20,
            x: 0,
            y: 30,
            rotate: 0,
            radius: [0,0,0,0],
            differentRadius: false,
            zIndex: 1,
            bold: true,
            underline: true,
            italic: true,
            size: 14,
            textAlign: 'left',
            font: 'Sans Serif',
            textColor: [0,0,0,1],
            fillColor: [255,255,255,1],
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: [0,0,0,1],
        },
        {
            type: 'Text',
            value: `Hi, it's Dorothy`,
            width: 20,
            height: 20,
            x: 10,
            y: 70,
            rotate: 0,
            radius: [5,5,5,5],
            differentRadius: false,
            zIndex: 2,
            bold: true,
            underline: true,
            italic: true,
            size: 12,
            textAlign: 'left',
            font: 'Ariel',
            textColor: [0,0,0,1],
            fillColor: [255,255,255,1],
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: [0,0,0,1],
        },
        {
            type: 'Line',
            height: 0,
            width: 50,
            x: 1,
            y: 60,
            rotate: 0,
            zIndex: 30,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: [0,0,0,1],
        },
        {
            type: 'Ellipse',
            width: 25,
            height: 25,
            x: 30,
            y: 0,
            rotate: 0,
            zIndex: 3,
            fillColor: [230,255,255,1],
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: [0,0,0,1],
        }
        
    ],
    selectedObject: [
        
        
    ],
    savedVersions: {

    },
    statistics: {
        minZIndex: 10000000,
        maxZIndex: 10000000,
        objectNum: 0,
        selected: 'none',
        zoom: 1,
        move: false,
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
        },
        ChangeEachSelectedProperties: (state, action) => {
            // payload is an array where 0=property name and 1=an array containing new values
            state.selectedObject.map((item, index) => {
                item[action.payload[0]] = action.payload[1][index];
            })
        },
        ChangeSelectedBorderWidth: (state, action) => {
            // payload is the new borderwidth
            state.selectedObject.map((item) => {
                const rotate = DegreeCalc(+item.rotate);

                const offsetX = ((+action.payload - +item.borderWidth) * Math.cos(rotate) + (+action.payload - +item.borderWidth) * Math.sin(rotate));
                const offsetY = ((+action.payload - +item.borderWidth) * Math.sin(rotate) + (+action.payload - +item.borderWidth) * Math.cos(rotate));

                item.borderWidth = action.payload;
                if (item.type === 'Line') {
                    item.y = +item.y - offsetY / 2;
                    return
                }
                item.x = +item.x - offsetX;
                item.y = +item.y - offsetY;
            })
        },
        ChangeSelectedText: (state, action) => {
            // payload is an array where 0=index number and 1=new value
            state.selectedObject[action.payload[0]].value = action.payload[1];
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
        ZoomInOutDraft: (state, action) => {
            // payload is the new zoom 
            state.statistics.zoom = action.payload;

        },
        SelectObject: (state, action) => {
            // payload is the index of the element selected
            var toSelected = state.everyObject.splice(action.payload, 1)
            state.selectedObject = state.selectedObject.concat(toSelected);

            if (state.statistics.selected === 'none') {
                state.statistics.selected = toSelected[0].type;
                return
            } 
            if (state.statistics.selected === toSelected[0].type) {
                if (state.statistics.selected[-1] === 's') {
                    return
                }
                state.statistics.selected += 's'
                return
            }
            state.statistics.selected = 'Selected';
        },
        DeselectObject: (state) => {
            state.everyObject = state.everyObject.concat(state.selectedObject);
            state.selectedObject.splice(0, state.selectedObject.length);
            state.statistics.selected = 'none';
        },
        DeselectParticularObject: (state, action) => {
            // payload is the index number of the item to deselect
            var toEvery = state.selectedObject.splice(action.payload, 1);
            state.everyObject = state.everyObject.concat(toEvery);

            if (state.selectedObject.length === 0) {
                state.statistics.selected = 'none';
                return
            }
            if (state.selectedObject.length === 1) {
                state.statistics.selected = state.selectedObject[0].type;
                return
            }
            const selected = state.selectedObject[0].type;
            for (var i = 0; i < state.selectedObject.length; i++) {
                if (state.selectedObject[i].type !== selected) {
                    state.statistics.selected = 'Selected';
                    break
                }
                if (i === state.selectedObject.length - 1) {
                    state.statistics.selected = selected + 's';
                }
            }
        },
        ToggleMove: (state, action) => {
            // payload is true or false
            state.statistics.move = action.payload;
        },
        MoveSelected: (state, action) => {
            // Payload is an object containing the difference between the new location and old location
            // [x, y] unit in pixels (0.26458mm)

            action.payload[0] = (+action.payload[0] * 0.26458) / (+state.statistics.zoom);
            action.payload[1] = (+action.payload[1] * 0.26458) / (+state.statistics.zoom);
            state.selectedObject.map((item) => {
                item.x += action.payload[0];
                item.y += action.payload[1];
            })

        }
    },
});

export const {ChangeCanvasProperties, ChangeSelectedProperties, ChangeEachSelectedProperties, ChangeSelectedText, ChangeSelectedBorderWidth, 
    SetDraftSize, ZoomInOutDraft,
SelectObject, DeselectObject, DeselectParticularObject, ToggleMove, MoveSelected} = draftSlice.actions;

export const selectDraft = (state) => state.draft;

export default draftSlice.reducer;