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

import { useOutsideClick } from "../../Functions";

export default function ProjectSettings(props) {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const currentProject = useSelector(selectCurrentProject);
    const everyProject = useSelector(selectEveryProject)

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
        <div className="popupform-positioner">
            <div className="popupform" ref={wrapperRef} >
                <h4 className="popupform-title">Project Settings</h4>
                <form className="popupform-form" onSubmit={handleRenameSubmit}>
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
                    }}>Finish</button>
                    {everyProject.length > 0 &&
                    <button className="popupform-button popupform-button-red popupform-right" onClick={handleDeletion}>Delete Project</button>
                    }
                </div>
            </div>
        </div>
        
    )
}