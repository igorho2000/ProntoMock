import React from "react";
import './Drop.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups, showPopup,
    selectEveryPopup,
} from '../../features/popupSlice';
import {
    switchProject,
    selectEveryProject, selectCurrentProject,
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";

export default function ProjectDrop() {
    const dispatch = useDispatch()
    const projectList = useSelector(selectEveryProject);

    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);

    const projectListOutput = projectList.map((item, index) => (
        <div className="projectdrop-list" key={`project${index}`} 
        onClick={() => {
            dispatch(switchProject(index));
            dispatch(resetPopups());
        }}>
            <img src="../../dashboard/project.svg" />
            <h3>{item.name}</h3>
        </div>
    ))


    return (
        <div className="projectdrop" ref={wrapperRef}>
            {projectListOutput}
            <hr className="projectdrop-line"/>
            <div className="projectdrop-list"
            style={{paddingLeft: "2px"}}
            onClick={() => {
                dispatch(resetPopups());
            }}>
                <img style={{height: "1.9rem"}} src="../../dashboard/newproject.svg" />
                <h3 style={{fontWeight: "700", color: "#f4d7d7ff"}}>New Project</h3>
            </div>
        </div>
    )
}