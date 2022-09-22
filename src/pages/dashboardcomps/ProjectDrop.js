import React from "react";
import './Drop.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups, showPopup,
} from '../../features/popupSlice';
import {
    switchProject,
    selectEveryProject,
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
            <img className="projectdrop-box" src="../../dashboard/project.svg" alt="project icon top portion" />
            <img className="projectdrop-lid" src="../../dashboard/project-lid.svg" alt="project icon bottom portion"/>
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
                dispatch(showPopup(['NewProject', 0]))
            }}>
                <img style={{height: "1.9rem", marginRight: "0.3rem"}} src="../../dashboard/newproject.svg"  alt="new project icon outer portion" />
                <img className="projectdrop-plus" src="../../dashboard/newproject-plus.svg" alt="new project icon inner portion" />
                <h3 style={{fontWeight: "700", color: "#f4d7d7ff"}}>New Project</h3>
            </div>
        </div>
    )
}