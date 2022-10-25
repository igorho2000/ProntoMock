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
import { paperSizes } from "../../features/paperSizes";

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

    const outputPaperSizes = Object.keys(paperSizes).map((item) => {
        if (item === 'Custom') {
            return
        }
        return (
        <option key={`papersize-${item}`}>{item}</option>
    )})

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(newProjectDraft(inputValue));
        dispatch(resetPopups());
    }

    return (
        <div className="popupform-positioner">
            <div className="popupform" ref={wrapperRef} >
                <h4>New Draft</h4>
                <form className="popupform-form" onSubmit={handleSubmit}>
                    <div className="popupform-input">
                        <label>Name</label>
                        <input type="text" value={inputValue.name} onChange={handleNameChange} />
                    </div>
                    <div className="popupform-input">
                        <label>Size</label>
                        <select id="projects" value={inputValue.size} onChange={handleSizeChange}>
                            {outputPaperSizes}
                        </select>
                    </div>
                    <div className="popupform-buttoncont">
                        <button className="popupform-button" onClick={() => dispatch(resetPopups())}>Cancel</button>
                        <input className="popupform-button popupform-button-blue popupform-button-right" type='submit' value='Create Draft' />
                    </div>
                </form>
            </div>
        </div>
        
    )
}