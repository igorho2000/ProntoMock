import React from "react";
import './Drop.css';

import { useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    renameProjectDraft,
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
        <div className="popupform-positioner">
            <div className="popupform" ref={wrapperRef}>
                <h4>Rename Draft</h4>
                <form className="popupform-form" onSubmit={handleSubmit}>
                    <div className="popupform-input">
                        <label>New Name</label>
                        <input type="text" value={inputValue} onChange={handleChange} />
                    </div>
                    <div className="popupform-buttoncont">
                        <button className="popupform-button" onClick={() => dispatch(resetPopups())}>Cancel</button>
                        <input className="popupform-button popupform-button-right popupform-button-blue" type="submit" value="Rename" />
                    </div>
                </form>
            </div>
        </div>
    )
}