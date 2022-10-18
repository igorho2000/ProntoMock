import { createSlice } from '@reduxjs/toolkit';
import { paperSizes } from './paperSizes';
import { defaultObject } from './defaultObjects';

import { DegreeCalc } from '../Functions';
import { act } from 'react-dom/test-utils';

const initialState = {
    canvasSettings: {
        name: 'First Draft',
        date: '9/22/2022',
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
            zIndex: 1002,
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
            zIndex: 1001,
            bold: false,
            underline: false,
            italic: false,
            size: 14,
            textAlign: 'left',
            font: 'Lobster',
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
            zIndex: 1003,
            bold: true,
            underline: true,
            italic: true,
            size: 12,
            textAlign: 'left',
            font: 'Arial',
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
            zIndex: 1004,
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
            zIndex: 1005,
            fillColor: [230,255,255,1],
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: [0,0,0,1],
        },
        {
            type: 'Image',
            src: '../../logo192.png',
            width: 25,
            height: 25,
            x: 40,
            y: 80,
            rotate: 0,
            radius: [0,0,0,0],
            differentRadius: false,
            zIndex: 1006,
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: [0,0,0,1],
        },
        {
            type: 'Icon',
            code: 'battery_0_bar',
            class: 'material-icons',
            width: 25,
            x: 0,
            y: 0,
            rotate: 0,
            radius: [0,0,0,0],
            differentRadius: false,
            zIndex: 1007,
            borderStyle: 'none',
            borderWidth: 0,
            borderColor: [0,0,0,1],
            fillColor: [0,0,0,1],
        },
    ],
    selectedObject: [
        
        
    ],
    savedVersions: [
        [
            {
                type: 'Square',
                width: 25,
                height: 25,
                x: 0,
                y: 0,
                rotate: 0,
                radius: [0,0,0,0],
                differentRadius: false,
                zIndex: 1002,
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
                zIndex: 1001,
                bold: false,
                underline: false,
                italic: false,
                size: 14,
                textAlign: 'left',
                font: 'Lobster',
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
                zIndex: 1003,
                bold: true,
                underline: true,
                italic: true,
                size: 12,
                textAlign: 'left',
                font: 'Arial',
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
                zIndex: 1004,
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
                zIndex: 1005,
                fillColor: [230,255,255,1],
                borderStyle: 'none',
                borderWidth: 0,
                borderColor: [0,0,0,1],
            },
            {
                type: 'Image',
                src: '../../logo192.png',
                width: 25,
                height: 25,
                x: 40,
                y: 80,
                rotate: 0,
                radius: [0,0,0,0],
                differentRadius: false,
                zIndex: 1006,
                borderStyle: 'none',
                borderWidth: 0,
                borderColor: [0,0,0,1],
            },
            {
                type: 'Icon',
                code: 'battery_0_bar',
                class: 'material-icons',
                width: 25,
                x: 0,
                y: 0,
                rotate: 0,
                radius: [0,0,0,0],
                differentRadius: false,
                zIndex: 1007,
                borderStyle: 'none',
                borderWidth: 0,
                borderColor: [0,0,0,1],
                fillColor: [0,0,0,1],
            },
        ]
    ],
    statistics: {
        minZIndex: 10000000,
        maxZIndex: 10000000,
        objectNum: 0,
        selected: 'none',
        zoom: 1,
        move: false,
        sizeX: false,
        sizeY: false,
        sizeXY: false,
    },
    exporting: false,
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
            // payload is am array 0 = target, 1 = true or false
            state.statistics[action.payload[0]] = action.payload[1];
        },
        MoveSelected: (state, action) => {
            // Payload is an array containing the difference between the new location and old location
            // [x, y] unit in pixels (0.26458mm)

            action.payload[0] = (+action.payload[0] * 0.26458) / (+state.statistics.zoom);
            action.payload[1] = (+action.payload[1] * 0.26458) / (+state.statistics.zoom);
            state.selectedObject.map((item) => {
                item.x = (+item.x + +action.payload[0]).toFixed(2);
                item.y = (+item.y + +action.payload[1]).toFixed(2);
            })
        },
        SizeXSelected: (state, action) => {
            // Payload is an array containing the difference between the new location and old location
            // [x, y] unit in pixels (0.26458mm)
            action.payload[0] = (+action.payload[0] * 0.26458) / (+state.statistics.zoom);
            state.selectedObject.map((item) => {
                item.width = (+item.width + +action.payload[0]).toFixed(2);
            })
        },
        SizeYSelected: (state, action) => {
            // Payload is an array containing the difference between the new location and old location
            // [x, y] unit in pixels (0.26458mm)
            action.payload[1] = (+action.payload[1] * 0.26458) / (+state.statistics.zoom);
            if (state.statistics.selected === 'Line') {
                state.selectedObject.map((item) => {
                    item.width = (+item.width + +action.payload[1]).toFixed(2);
                    item.y = (+item.y + +action.payload[1]).toFixed(2);
                })
                return
            }
            state.selectedObject.map((item) => {
                item.height = (+item.height + +action.payload[1]).toFixed(2);
            })
        },
        SizeXYSelected: (state, action) => {
            // Payload is an array containing the difference between the new location and old location
            // [x, y] unit in pixels (0.26458mm)
            // 2= selectedItemInfo 3= selectedStats
            
            action.payload[0] = (+action.payload[0] * 0.26458) / (+state.statistics.zoom);
            action.payload[1] = (+action.payload[1] * 0.26458) / (+state.statistics.zoom);
            if (action.payload[0] * action.payload[1] < 0) {
                return
            }

            action.payload[0] = action.payload[0] > action.payload[1] ? action.payload[0] : action.payload[1] * (action.payload[3].selectedWidth / action.payload[3].selectedHeight);
            action.payload[1] = action.payload[1] > action.payload[0] ? action.payload[1] : action.payload[0] * (action.payload[3].selectedHeight / action.payload[3].selectedWidth);
            
            for (let i = 0; i<state.selectedObject.length; i++) {
                const widthPercentage = action.payload[2][i].visualWidth / action.payload[3].selectedWidth;
                const heightPercentage = action.payload[2][i].visualHeight / action.payload[3].selectedHeight;
                const toLeftBoundPercentage = (action.payload[2][i].visualLeft - action.payload[3].leftBound) / action.payload[3].selectedWidth;
                const toTopBoundPercentage = (action.payload[2][i].visualTop - action.payload[3].topBound) / action.payload[3].selectedHeight;
                const widthDifPercentage = action.payload[2][i].widthDif / action.payload[2][i].visualWidth;
                const heightDifPercentage = action.payload[2][i].heightDif / action.payload[2][i].visualHeight;
                state.selectedObject[i].x = +state.selectedObject[i].x + action.payload[0] * (toLeftBoundPercentage + widthDifPercentage);
                state.selectedObject[i].y = +state.selectedObject[i].y + action.payload[1] * (toTopBoundPercentage + heightDifPercentage);
                if (action.payload[2][i].type === 'Line') {
                    state.selectedObject[i].width = +state.selectedObject[i].width + action.payload[0] * (widthPercentage - 2 * widthDifPercentage);
                    continue
                }
                if (action.payload[2][i].type === 'Icon') {
                    state.selectedObject[i].width = +state.selectedObject[i].width + action.payload[0] * (widthPercentage - 2 * widthDifPercentage);
                    continue
                }
                state.selectedObject[i].width = +state.selectedObject[i].width + action.payload[0] * (widthPercentage - 2 * widthDifPercentage);
                state.selectedObject[i].height = +state.selectedObject[i].height + action.payload[1] * (heightPercentage - 2 * heightDifPercentage);
            }
        },
        DeleteSelected: (state) => {
            state.selectedObject.splice(0, state.selectedObject.length);
            state.statistics.selected = 'none';
        }, 
        SaveDraft: (state) => {
            var toConcat = state.selectedObject.splice(0, state.selectedObject.length);
            var toSave = state.everyObject.concat(toConcat);
            state.savedVersions = [...state.savedVersions, toSave];
            state.selectedObject = state.selectedObject.concat(toConcat);
            if (state.savedVersions.length > 50) {
                state.savedVersions.shift();
            }
        },
        UndoAction: (state) => {
            if (state.savedVersions.length <= 1) {
                return
            }
            var toEverything = state.selectedObject.splice(0, state.selectedObject.length);
            state.everyObject = state.everyObject.concat(toEverything);
            state.everyObject.splice(0, state.everyObject.length);
            state.everyObject = [...state.savedVersions[state.savedVersions.length - 2]]
            state.savedVersions.pop();
            state.statistics.selected = 'none';
        },
        PasteSelected: (state, action) => {
            // payload is an array containing paste items
            var toEverything = state.selectedObject.splice(0, state.selectedObject.length);
            state.everyObject = state.everyObject.concat(toEverything);
            state.selectedObject = state.selectedObject.concat(action.payload);

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
        DuplicateSelected: (state) => {
            state.everyObject = state.everyObject.concat(state.selectedObject);
        },
        ToggleExport: (state, action) => {
            // payload is true or false
            state.exporting = action.payload;
        },
        AddObject: (state, action) => {
            // payload is the index number of the new default object
            const toEverything = {...defaultObject[action.payload]}
            toEverything.zIndex = state.everyObject.length + state.selectedObject.length + 1000
            state.everyObject.push(toEverything);
        },
        AddImage: (state, action) => {
            // payload is an array 0=link, 1=width, 2=height
            var toEverything = {...defaultObject[4]};
            toEverything.zIndex = state.everyObject.length + state.selectedObject.length + 1000;
            toEverything.src = action.payload[0];
            toEverything.width = action.payload[1];
            toEverything.height = action.payload[2];
            state.everyObject.push(toEverything);
        },
        AddIcon: (state, action) => {
            // payload is an array 0=code, 1=class
            var toEverything = {...defaultObject[5]};
            toEverything.zIndex = state.everyObject.length + state.selectedObject.length + 1000;
            toEverything.code = action.payload[0];
            toEverything.class = action.payload[1];
            state.everyObject.push(toEverything);
        },
        SortEveryObjectByZ: (state) => {
            state.everyObject = state.everyObject.sort((a, b) => (+a.zIndex > +b.zIndex) ? 1 : -1)
            for (let i = 0; i < state.everyObject.length; i++) {
                state.everyObject[i].zIndex = i + 1001;
            }
        },
        MoveSelectedToFront: (state) => {
            state.selectedObject = state.selectedObject.sort((a, b) => (+a.zIndex > +b.zIndex) ? 1 : -1)
            for (let i = 0; i < state.everyObject.length; i++) {
                state.everyObject[i].zIndex = i;
            }
        },
        MoveSelectedToBack: (state) => {
            state.selectedObject = state.selectedObject.sort((a, b) => (+a.zIndex > +b.zIndex) ? 1 : -1)
            for (let i = 0; i < state.everyObject.length; i++) {
                state.everyObject[i].zIndex = i + 100000;
            }
        }
    },
});

export const {ChangeCanvasProperties, ChangeSelectedProperties, ChangeEachSelectedProperties, ChangeSelectedText, ChangeSelectedBorderWidth, 
            SetDraftSize, ZoomInOutDraft, SortEveryObjectByZ, MoveSelectedToBack, MoveSelectedToFront,
            SelectObject, DeselectObject, DeselectParticularObject, ToggleMove, MoveSelected, SizeXSelected, SizeXYSelected, SizeYSelected,
            DeleteSelected, SaveDraft, UndoAction, PasteSelected, DuplicateSelected, ToggleExport, AddObject, AddImage, AddIcon} = draftSlice.actions;

export const selectDraft = (state) => state.draft;

export default draftSlice.reducer;