import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    everyProject: [],
    currentProject: [],
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        initializeCurrentProject: (state, action) => {
            if (state.currentProject.length === 0) {
                state.currentProject.push(action.payload);
            }
            console.log(action.payload);
        },
        initializeEveryProject: (state, action) => {
            const idArray = state.everyProject.map((item) => (item.id))
            if (idArray.includes(action.payload.id) === false) {
                state.everyProject.push(action.payload);
            }
            console.log(action.payload);
        },
        wipeProject: (state) => {
            state.currentProject.splice(0, state.currentProject.length);
            state.everyProject.splice(0, state.everyProject.length);
        },
        switchProject: (state, action) => {
            // Payload is the index number
            var toList = state.currentProject.splice(0, 1);
            var toCurrent = state.everyProject.splice(action.payload, 1);
            state.currentProject = toCurrent;
            state.everyProject = toList.concat(state.everyProject);
        },
        renameProject: (state, action) => {
            // Payload is the new name
            state.currentProject[0].name = action.payload;
        },
        deleteProject: (state) => {
            state.currentProject.splice(0, 1);
        },
        newProject: (state, action) => {
            // Payload is the new project name and id
            state.everyProject.unshift({
                name: action.payload[0],
                drafts: [],
                starredDrafts: [],
                team: [],
                id: action.payload[1]
            })
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
            // Payload is an Array where 0=index 1=starred? 2=new id
            const target = action.payload[1] ? state.currentProject[0].starredDrafts : state.currentProject[0].drafts;
            const toDuplicate = {
                ...target[action.payload[0]],
                name: target[action.payload[0]].name + ' (Duplicate)',
                id: action.payload[2]
            }
            state.currentProject[0].drafts.push(toDuplicate);
        },
        deleteProjectDraft: (state, action) => {
            // Payload is an Array where 0=index 1=starred?
            const target = action.payload[1] ? state.currentProject[0].starredDrafts : state.currentProject[0].drafts;
            target.splice(action.payload[0], 1);
        },
        renameProjectDraft: (state, action) => {
            // Payload is an Array where 0=index 1=starred? 2=newName
            if (action.payload[1] === true ) {
                state.currentProject[0].starredDrafts[action.payload[0]].name = action.payload[2];
            } else {
                state.currentProject[0].drafts[action.payload[0]].name = action.payload[2];
            }
        },
        moveProjectDraft: (state, action) => {
            // Payload is an Array where 0=index 1=starred? 2=indexOfNewProject
            const star = action.payload[1] ? 'starredDrafts' : 'drafts';
            var toMove = state.currentProject[0][star].splice(action.payload[0], 1);
            state.everyProject[action.payload[2]][star].unshift(toMove[0]);
        },
        newProjectDraft: (state, action) => {
            // Payload is an Array
            state.currentProject[0].drafts.unshift({
                name: action.payload[0],
                id: action.payload[1],
                image: action.payload[2],
            })
        },
        updateDraftThumbnail: (state, action) => {
            state[action.payload[0][0]][action.payload[0][1]][action.payload[0][2]][action.payload[0][3]].image = action.payload[1]
        }
    },
});

export const {updateDraftThumbnail, initializeCurrentProject, initializeEveryProject, wipeProject, changeUserState, switchProject, renameProject, deleteProject, newProject,
              starProjectDraft, unstarProjectDraft, duplicateProjectDraft, deleteProjectDraft, 
              renameProjectDraft, moveProjectDraft, newProjectDraft} = projectSlice.actions;

export const selectEveryProject = (state) => state.project.everyProject;
export const selectCurrentProject = (state) => state.project.currentProject;

export default projectSlice.reducer;