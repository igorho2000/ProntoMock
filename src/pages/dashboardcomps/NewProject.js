import React from "react";
import './Drop.css';

import { useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    switchProject, newProject,
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";

export default function NewProject() {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState('');

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(newProject(inputValue));
        dispatch(switchProject(0));
        dispatch(resetPopups());
    }

    return (
        <div className="draftrename newproject" ref={wrapperRef} >
            <h4 className="draftrename-title">New Project</h4>
            <div className="projectsettings-cont">
                
                <form className="newproject-form" onSubmit={handleSubmit}>
                    <h5 className="projectsettings-section">Enter Project Name</h5>
                    <input className="draftrename-input" type="text" value={inputValue} onChange={handleChange} />
                    <div className="draftrename-buttoncont">
                        <button className="draftrename-cancel" onClick={() => dispatch(resetPopups())}>Cancel</button>
                        <input className="draftrename-submit" type="submit" value="Create Project"/>
                    </div>
                </form>
            </div>
        </div>
    )
}