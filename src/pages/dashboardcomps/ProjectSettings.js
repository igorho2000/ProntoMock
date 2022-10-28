import React from "react";
import './Drop.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    switchProject, renameProject, deleteProject,
    selectCurrentProject,
    selectEveryProject,
} from '../../features/projectSlice';
import { selectProjectCodes, selectUser, changeUserProjects } from "../../features/userSlice";

import { db } from "../../Firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";

import { useOutsideClick } from "../../Functions";

export default function ProjectSettings(props) {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const currentProject = useSelector(selectCurrentProject);
    const everyProject = useSelector(selectEveryProject);
    const projectCodes = useSelector(selectProjectCodes);
    const user = useSelector(selectUser);

    const [nameValue, setNameValue] = React.useState(currentProject[0].name);

    function handleRenameChange(event) {
        setNameValue(event.target.value);
    }

    function handleDeletion() {
        const projectID = currentProject[0].id.replace(' ', '');
        var updatedProjectCodes = [...projectCodes];
        updatedProjectCodes.splice(updatedProjectCodes.indexOf(projectID), 1);
        var draftIDs = currentProject[0].drafts.map((item) => (item.id));
        draftIDs.concat(currentProject[0].starredDrafts.map((item) => (item.id)));
        for (let i = 0; i < draftIDs.length; i++) {
            const draftID = draftIDs[i].replace(' ', '');
            deleteDoc(doc(db, 'draft', draftID));
        }
        deleteDoc(doc(db, 'projects', projectID));
        updateDoc(doc(db, 'user', user.id), {projects: updatedProjectCodes});
        dispatch(changeUserProjects(updatedProjectCodes));
        dispatch(deleteProject());
        dispatch(switchProject(0));
        dispatch(resetPopups());
    }

    return (
        <div className="popupform-positioner">
            <div className="popupform" ref={wrapperRef} >
                <h4 className="popupform-title">Project Settings</h4>
                <form className="popupform-form">
                    <div className="popupform-input">
                        <label>Rename</label>
                        <input type="text" value={nameValue} onChange={handleRenameChange} />
                    </div>
                </form>
                <div className="popupform-input">
                    <label>Team</label>
                </div>
                <div className="popupform-buttoncont">
                    <button className="popupform-button popupform-button-blue" onClick={() => {
                        dispatch(renameProject(nameValue));
                        dispatch(resetPopups());
                        const projectID = currentProject[0].id.replace(' ', '');
                        updateDoc((doc(db, 'projects', projectID)), {name: nameValue});
                    }}>Finish</button>
                    {everyProject.length > 0 &&
                    <button className="popupform-button popupform-button-red popupform-right" onClick={handleDeletion}>Delete Project</button>
                    }
                </div>
            </div>
        </div>
        
    )
}