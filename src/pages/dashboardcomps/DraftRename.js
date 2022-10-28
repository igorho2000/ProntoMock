import React from "react";
import './Drop.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    renameProjectDraft, selectCurrentProject
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";
import { db } from "../../Firebase";
import { updateDoc, doc } from "firebase/firestore";

export default function DraftRename(props) {
    const wrapperRef = React.useRef(null);
    const currentProject = useSelector(selectCurrentProject);
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
        const projectID = currentProject[0].id.replace(' ', '');
        updateDoc(doc(db, 'draft', props.id), {'canvasSettings.name': inputValue});
        if (props.star) {
            var updatedDrafts = [...currentProject[0].starredDrafts];
            updatedDrafts[props.index] = {
                name: inputValue,
                id: props.id
            };
            updateDoc(doc(db, 'projects', projectID), {starredDrafts: updatedDrafts});
        } else {
            var updatedDrafts = [...currentProject[0].drafts];
            updatedDrafts[props.index] = {
                name: inputValue,
                id: props.id
            };
            updateDoc(doc(db, 'projects', projectID), {drafts: updatedDrafts});
        }
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