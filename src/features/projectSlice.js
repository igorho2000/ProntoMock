import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = {
    everyProject: [
        
        {
            name: 'ProntoMock',
            drafts: [],
            team: []
        },
        {
            name: 'RoadRule',
            drafts: [],
            team: []
        },
        {
            name: 'Pa Movie',
            drafts: [],
            team: []
        },
        {
            name: 'Good Rent',
            drafts: [],
            team: []
        },
        {
            name: 'Restful Trip',
            drafts: [{
                name: 'Project Promotion Poster',
                type: 'A3 Horizontal',
                date: '8/6/2022'
            },],
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
                    date: '8/6/2022'
                },
                {
                    name: 'Flyer Design',
                    type: 'B4 Portrait',
                    date: '9/8/2022'
                },
                {
                    name: 'Project Promotion Poster',
                    type: 'A3 Horizontal',
                    date: '8/6/2022'
                },
                {
                    name: 'Flyer Design',
                    type: 'B4 Portrait',
                    date: '9/8/2022'
                }
            ],
            team: []
        },
    ]
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        switchProject: (state, action) => {
            var toList = state.currentProject.splice(0, 1);
            var toCurrent = state.everyProject.splice(action.payload, 1);
            state.currentProject = toCurrent;
            state.everyProject = toList.concat(state.everyProject);
        },
    },
});

export const {switchProject} = projectSlice.actions;

export const selectEveryProject = (state) => state.project.everyProject;
export const selectCurrentProject = (state) => state.project.currentProject;

export default projectSlice.reducer;