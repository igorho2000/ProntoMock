import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = {
    everyProject: [
        
        {
            name: 'ProntoMock',
            drafts: [],
            starredDrafts: [],
            team: []
        },
        {
            name: 'RoadRule',
            drafts: [],
            starredDrafts: [],
            team: []
        },
        {
            name: 'Pa Movie',
            drafts: [],
            starredDrafts: [],
            team: []
        },
        {
            name: 'Good Rent',
            drafts: [],
            starredDrafts: [],
            team: []
        },
        {
            name: 'Restful Trip',
            drafts: [{
                name: 'Project Promotion Poster',
                type: 'A3 Horizontal',
                date: '8/6/2022',
            },],
            starredDrafts: [],
            team: []
        },
    ],
    currentProject: [
        {
            name: 'One Premium',
            drafts: [
                {
                    name: 'Project Promotion Poster',
                    type: 'A3 Horizontal',
                    date: '8/6/2022',
                },
                {
                    name: 'Flyer Design',
                    type: 'B4 Portrait',
                    date: '9/8/2022',
                },
                {
                    name: 'Project Promotion Poster',
                    type: 'A3 Horizontal',
                    date: '8/6/2022',
                },
                {
                    name: 'Flyer Design',
                    type: 'B4 Portrait',
                    date: '9/8/2022',
                }
            ],
            starredDrafts: [],
            team: []
        },
    ]
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        switchProject: (state, action) => {
            // Payload is the index number
            var toList = state.currentProject.splice(0, 1);
            var toCurrent = state.everyProject.splice(action.payload, 1);
            state.currentProject = toCurrent;
            state.everyProject = toList.concat(state.everyProject);
        },
        starProjectDraft: (state, action) => {
            // Payload is the index number
            var toStarred = state.currentProject[0].drafts.splice(action.payload, 1);
            state.currentProject[0].starredDrafts = toStarred.concat(state.currentProject[0].starredDrafts);
        },
        unstarProjectDraft: (state, action) => {
            // Payload is the index number
            var toDraft = state.currentProject[0].starredDrafts.splice(action.payload, 1);
            state.currentProject[0].drafts = toDraft.concat(state.currentProject[0].drafts);
        },
        duplicateProjectDraft: (state, action) => {
            // Payload is an Array where 0=index 1=starred?
            const target = action.payload[1] ? state.currentProject[0].starredDrafts : state.currentProject[0].drafts;
            const toDuplicate = target.splice(action.payload[0], 1)
            const toAdd = {
                name: toDuplicate[0].name,
                type: toDuplicate[0].type,
                date: toDuplicate[0].date
            }
            toAdd.name += ' (Duplicate)';
            target.splice(action.payload[0], 0, toDuplicate[0], toAdd);
        },
        deleteProjectDraft: (state, action) => {
            // Payload is an Array where 0=index 1=starred?
            const target = action.payload[1] ? state.currentProject[0].starredDrafts : state.currentProject[0].drafts;
            target.splice(action.payload[0], 1);
        },
        renameProjectDraft: (state, action) => {
            // Payload is an Array where 0=index 1=starred? 2=newName
            const target = action.payload[1] ? state.currentProject[0].starredDrafts : state.currentProject[0].drafts;
            target[action.payload[0]].name = action.payload[2];
        },
    },
});

export const {switchProject, starProjectDraft, unstarProjectDraft, duplicateProjectDraft, deleteProjectDraft, 
              renameProjectDraft} = projectSlice.actions;

export const selectEveryProject = (state) => state.project.everyProject;
export const selectCurrentProject = (state) => state.project.currentProject;

export default projectSlice.reducer;