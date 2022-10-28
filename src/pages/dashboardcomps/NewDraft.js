import React from "react";
import './Drop.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    newProjectDraft, selectCurrentProject
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";
import { paperSizes } from "../../features/paperSizes";

import { db } from "../../Firebase";
import { updateDoc, addDoc, setDoc, doc, collection } from "firebase/firestore";

export default function NewDraft() {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();
    const currentProject = useSelector(selectCurrentProject);

    const [inputValue, setInputValue] = React.useState({
        name: 'My New Draft',
        size: 'A4 Portrait',
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

    const outputPaperSizes = Object.keys(paperSizes).map((item) => {
        if (item === 'Custom') {
            return
        }
        return (
        <option key={`papersize-${item}`}>{item}</option>
    )})

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(resetPopups());
        addDoc(collection(db, 'draft'), {
            canvasSettings: {
                name: inputValue.name,
                size: inputValue.size,
                unit: 'mm',
                width: paperSizes[inputValue.size][0],
                height: paperSizes[inputValue.size][1],
                margin: [10,10,10,10],
                differentMargin: false,
                fillColor: [255,255,255,1]
            },
            everyObject: []
        }).then((result) => {
            const projectID = currentProject[0].id.replace(' ', '');
            var updatedDrafts = [...currentProject[0].drafts];
            updatedDrafts.unshift({
                name: inputValue.name,
                id: result.id
            })
            updateDoc(doc(db, 'projects', projectID), {drafts: updatedDrafts});
            setDoc(doc(db, 'draft', result.id), {id: result.id}, {merge: true});
            dispatch(newProjectDraft([inputValue.name, result.id]));
        })
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