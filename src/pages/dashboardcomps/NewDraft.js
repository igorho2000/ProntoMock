import React from "react";
import './Drop.css';

import { useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    newProjectDraft,
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";

export default function NewDraft() {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        name: 'My New Draft',
        size: 'A4',
        orientation: 'Portrait'
    });

    function handleNameChange(event) {
        setInputValue((state) => ({
            ...state,
            name: event.target.value,
        }));
    }
    function handleSizeChange(event) {
        setInputValue((state) => ({
            ...state,
            size: event.target.value,
        }))
    }
    function handleOrientationChange(event) {
        setInputValue((state) => ({
            ...state,
            orientation: event.target.value,
        }))
    }

    const sizes = ['A4', 'A3']
    const sizesOutput = sizes.map((item, index) => (
        <option value={item} key={`size${index}`} >
            {item}
        </option>
    ))

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(newProjectDraft(inputValue));
        dispatch(resetPopups());
    }

    return (
        <div className="draftrename newdraft" ref={wrapperRef} >
            <h4 className="draftrename-title">New Draft</h4>
            
            <form className="newdraft-form" onSubmit={handleSubmit}>
                <h5 className="projectsettings-section">Draft Name</h5>
                <input className="draftrename-input newdraft-input" type="text" value={inputValue.name} onChange={handleNameChange} />
                <h5 className="projectsettings-section">Draft Settings</h5>
                <select className="draftrename-input newdraft-drop" id="projects" value={inputValue.size} onChange={handleSizeChange}>
                    {sizesOutput}
                </select>
                <div>
                    <label className="newdraft-radiotext">
                        <input className="newdraft-radio" type="radio" name="orientation" value="Portrait" checked={inputValue.orientation === "Portrait"} onChange={handleOrientationChange} />
                        Portrait
                    </label>
                    <label className="newdraft-radiotext">
                        <input className="newdraft-radio" type="radio" name="orientation" value="Horizontal" checked={inputValue.orientation === "Horizontal"} onChange={handleOrientationChange} />
                        Horizontal
                    </label>
                </div>
                
                <div className="draftrename-buttoncont">
                    <button className="draftrename-cancel" onClick={() => dispatch(resetPopups())}>Cancel</button>
                    <input className="draftrename-submit" type='submit' value='Create Draft' />
                </div>
            </form>
        </div>
    )
}