import React from "react";
import './Drop.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups, showPopup,
    selectEveryPopup,
} from '../../features/popupSlice';
import {
    switchProject, renameProjectDraft,
    selectEveryProject, selectCurrentProject,
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";

export default function DraftRename(props) {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState(props.name);
    
    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(renameProjectDraft([props.index, props.star, inputValue]));
        dispatch(resetPopups());
    }

    return (
        <div className="draftrename" ref={wrapperRef}>
            <form className="draftrename-form" onSubmit={handleSubmit}>
                <h4 className="draftrename-title">Rename Draft</h4>
                <input className="draftrename-input" type="text" value={inputValue} onChange={handleChange} />
                <div className="draftrename-buttoncont">
                    <button className="draftrename-cancel" onClick={() => dispatch(resetPopups())}>Cancel</button>
                    <input className="draftrename-submit" type="submit" value="Rename" />
                </div>
            </form>
        </div>
    )
}