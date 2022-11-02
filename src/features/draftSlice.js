import { createSlice } from '@reduxjs/toolkit';
import { paperSizes } from './paperSizes';
import { defaultObject } from './defaultObjects';

import { DegreeCalc } from '../Functions';

const initialState = {
    id: '',
    project: [],
    canvasSettings: {},
    everyObject: [],
    selectedObject: [],
    savedVersions: [],
    statistics: {
        selected: 'none',
        zoom: 1,
        move: false,
        sizeX: false,
        sizeY: false,
        sizeXY: false,
        savedToDatabase: true
    },
    exporting: false,
}

export const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        InitializeDraft: (state, action) => {
            // payload is an array 0=id 1=rest of stuff
            state.id = action.payload[0];
            state.project = state.project.concat(action.payload[2]);
            state.canvasSettings = action.payload[1].canvasSettings;
            state.everyObject = state.everyObject.concat(action.payload[1].everyObject);
            state.savedVersions.push(action.payload[1].everyObject);
        },
        WipeDraft: (state) => {
            state.canvasSettings = {}
            state.everyObject.splice(0, state.everyObject.length);
            state.selectedObject.splice(0, state.selectedObject.length);
            state.savedVersions.splice(0, state.savedVersions.length);
            state.statistics = {
                selected: 'none',
                zoom: 1,
                move: false,
                sizeX: false,
                sizeY: false,
                sizeXY: false,
                savedToDatabase: true
            }
            state.exporting = false;
            state.id = '';
            state.project.splice(0, state.project.length);
        },
        SaveToDatabase: (state) => {
            state.statistics.savedToDatabase = true;
        },
        ChangeCanvasProperties: (state, action) => {
            // payload is an array where 0=property name and 1=new value
            state.canvasSettings[action.payload[0]] = action.payload[1];
            state.statistics.savedToDatabase = false;
        },
        ChangeSelectedProperties: (state, action) => {
            // payload is an array where 0=property name and 1=new value
            state.selectedObject.forEach((element) => {
                element[action.payload[0]] = action.payload[1];
            })
            state.statistics.savedToDatabase = false;
        },
        ChangeEachSelectedProperties: (state, action) => {
            // payload is an array where 0=property name and 1=an array containing new values
            state.selectedObject.forEach((element, index) => {
                element[action.payload[0]] = action.payload[1][index];
            })
            state.statistics.savedToDatabase = false;
        },
        ChangeSelectedBorderWidth: (state, action) => {
            // payload is the new borderwidth
            state.selectedObject.forEach((element) => {
                const rotate = DegreeCalc(+element.rotate);

                const offsetX = ((+action.payload - +element.borderWidth) * Math.cos(rotate) + (+action.payload - +element.borderWidth) * Math.sin(rotate));
                const offsetY = ((+action.payload - +element.borderWidth) * Math.sin(rotate) + (+action.payload - +element.borderWidth) * Math.cos(rotate));

                element.borderWidth = action.payload;
                if (element.type === 'Line') {
                    element.y = +element.y - offsetY / 2;
                    return
                }
                element.x = +element.x - offsetX;
                element.y = +element.y - offsetY;
            })
            state.statistics.savedToDatabase = false;
        },
        ChangeSelectedText: (state, action) => {
            // payload is an array where 0=index number and 1=new value
            state.selectedObject[action.payload[0]].value = action.payload[1];
            state.statistics.savedToDatabase = false;
        },
        SetDraftSize: (state, action) => {
            // payload is a string of the paper size
            if (action.payload === 'Custom') {
                state.canvasSettings.size = action.payload;
                state.statistics.savedToDatabase = false;
                return
            } 
            state.canvasSettings.size = action.payload;
            state.canvasSettings.width = paperSizes[action.payload][0];
            state.canvasSettings.height = paperSizes[action.payload][1];
            state.statistics.savedToDatabase = false;
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
            state.selectedObject.forEach((element) => {
                element.x = (+element.x + +action.payload[0]).toFixed(2);
                element.y = (+element.y + +action.payload[1]).toFixed(2);
            })
            state.statistics.savedToDatabase = false;
        },
        SizeXSelected: (state, action) => {
            // Payload is an array containing the difference between the new location and old location
            // [x, y] unit in pixels (0.26458mm)
            action.payload[0] = (+action.payload[0] * 0.26458) / (+state.statistics.zoom);
            state.selectedObject.forEach((element) => {
                element.width = (+element.width + +action.payload[0]).toFixed(2);
            })
            state.statistics.savedToDatabase = false;
        },
        SizeYSelected: (state, action) => {
            // Payload is an array containing the difference between the new location and old location
            // [x, y] unit in pixels (0.26458mm)
            action.payload[1] = (+action.payload[1] * 0.26458) / (+state.statistics.zoom);
            if (state.statistics.selected === 'Line') {
                state.selectedObject.forEach((element) => {
                    element.width = (+element.width + +action.payload[1]).toFixed(2);
                    element.y = (+element.y + +action.payload[1]).toFixed(2);
                })
                return
            }
            state.selectedObject.forEach((element) => {
                element.height = (+element.height + +action.payload[1]).toFixed(2);
            })
            state.statistics.savedToDatabase = false;
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
            state.statistics.savedToDatabase = false;
        },
        DeleteSelected: (state) => {
            state.selectedObject.splice(0, state.selectedObject.length);
            state.statistics.selected = 'none';
            state.statistics.savedToDatabase = false;
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
            state.statistics.savedToDatabase = false;
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
            state.statistics.savedToDatabase = false;
        },
        DuplicateSelected: (state) => {
            state.everyObject = state.everyObject.concat(state.selectedObject);
            state.statistics.savedToDatabase = false;
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
            state.statistics.savedToDatabase = false;
        },
        AddImage: (state, action) => {
            // payload is an array 0=link, 1=width, 2=height
            var toEverything = {...defaultObject[4]};
            toEverything.zIndex = state.everyObject.length + state.selectedObject.length + 1000;
            toEverything.src = action.payload[0];
            toEverything.width = action.payload[1];
            toEverything.height = action.payload[2];
            state.everyObject.push(toEverything);
            state.statistics.savedToDatabase = false;
        },
        AddIcon: (state, action) => {
            // payload is an array 0=code, 1=class
            var toEverything = {...defaultObject[5]};
            toEverything.zIndex = state.everyObject.length + state.selectedObject.length + 1000;
            toEverything.code = action.payload[0];
            toEverything.class = action.payload[1];
            state.everyObject.push(toEverything);
            state.statistics.savedToDatabase = false;
        },
        SortEveryObjectByZ: (state) => {
            state.everyObject = state.everyObject.sort((a, b) => (+a.zIndex > +b.zIndex) ? 1 : -1)
            for (let i = 0; i < state.everyObject.length; i++) {
                state.everyObject[i].zIndex = i + 1001;
            }
            state.statistics.savedToDatabase = false;
        },
        MoveSelectedToFront: (state) => {
            state.selectedObject = state.selectedObject.sort((a, b) => (+a.zIndex > +b.zIndex) ? 1 : -1)
            for (let i = 0; i < state.everyObject.length; i++) {
                state.everyObject[i].zIndex = i;
            }
            state.statistics.savedToDatabase = false;
        },
        MoveSelectedToBack: (state) => {
            state.selectedObject = state.selectedObject.sort((a, b) => (+a.zIndex > +b.zIndex) ? 1 : -1)
            for (let i = 0; i < state.everyObject.length; i++) {
                state.everyObject[i].zIndex = i + 100000;
            }
            state.statistics.savedToDatabase = false;
        }
    },
});

export const {InitializeDraft, WipeDraft, SaveToDatabase,
            ChangeCanvasProperties, ChangeSelectedProperties, ChangeEachSelectedProperties, ChangeSelectedText, ChangeSelectedBorderWidth, 
            SetDraftSize, ZoomInOutDraft, SortEveryObjectByZ, MoveSelectedToBack, MoveSelectedToFront,
            SelectObject, DeselectObject, DeselectParticularObject, ToggleMove, MoveSelected, SizeXSelected, SizeXYSelected, SizeYSelected,
            DeleteSelected, SaveDraft, UndoAction, PasteSelected, DuplicateSelected, ToggleExport, AddObject, AddImage, AddIcon} = draftSlice.actions;

export const selectDraft = (state) => state.draft;

export default draftSlice.reducer;