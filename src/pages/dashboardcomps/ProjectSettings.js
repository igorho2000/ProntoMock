import React from "react";
import './Drop.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    switchProject, renameProject, deleteProject,
    selectCurrentProject,
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";

export default function ProjectSettings(props) {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const currentProject = useSelector(selectCurrentProject);

    const [nameValue, setNameValue] = React.useState(currentProject[0].name);

    function handleRenameChange(event) {
        setNameValue((state) => (event.target.value));
    }

    function handleRenameSubmit(event) {
        event.preventDefault();
        dispatch(renameProject(nameValue));

    }

    function handleDeletion() {
        dispatch(deleteProject());
        dispatch(switchProject(0));
        dispatch(resetPopups());
    }

    return (
        <div className="draftrename projectsettings" ref={wrapperRef} >
            <h4 className="draftrename-title">Project Settings</h4>
            <div className="projectsettings-cont">
                <h5 className="projectsettings-section">Rename Project</h5>
                <form className="projectsettings-form" onSubmit={handleRenameSubmit}>
                    <input className="draftrename-input" type="text" value={nameValue} onChange={handleRenameChange} />
                    <input className="draftrename-submit" type="submit" value="Rename"/>
                </form>
                <h5 className="projectsettings-section">Edit Collaborators</h5>
            </div>
           
            
            <div className="draftrename-buttoncont">
                <button className="draftrename-cancel" onClick={() => dispatch(resetPopups())}>Finish</button>
                <button className="draftrename-delete" onClick={handleDeletion}>Delete Project</button>
            </div>
        </div>
    )
}