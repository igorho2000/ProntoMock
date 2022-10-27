import React from "react";
import './Drop.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    switchProject, newProject,
} from '../../features/projectSlice';
import { selectProjectCodes, selectUser, changeUserProjects } from "../../features/userSlice";

import { db } from "../../Firebase";
import { updateDoc, doc, addDoc, collection, setDoc } from "firebase/firestore";

import { useOutsideClick } from "../../Functions";

export default function NewProject() {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();
    const projectCodes = useSelector(selectProjectCodes);
    const user = useSelector(selectUser);

    const [inputValue, setInputValue] = React.useState('My New Project');

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        addDoc(collection(db, 'projects'), {
            drafts: [],
            starredDrafts: [],
            name: inputValue,
            team: [user.id]
        }).then((result) => {
            const projectID = result.id;
            console.log(result.id);
            var updatedProjectCodes = [...projectCodes];
            updatedProjectCodes.unshift(projectID);
            updateDoc(doc(db, 'user', user.id), {projects: updatedProjectCodes});
            setDoc(doc(db, 'projects', projectID), {id:projectID}, {merge: true});
            dispatch(newProject([inputValue, projectID]));
            dispatch(switchProject(0));
            dispatch(changeUserProjects(updatedProjectCodes));
            dispatch(resetPopups());
        })
    }

    return (
        <div className="popupform-positioner">
            <div className="popupform" ref={wrapperRef} >
                <h4>New Project</h4>
                <form className="popupform-form" onSubmit={handleSubmit}>
                    <div className="popupform-input">
                        <label>Name</label>
                        <input type="text" value={inputValue} onChange={handleChange} />
                    </div>
                    <div className="popupform-buttoncont">
                        <button className="popupform-button" onClick={() => dispatch(resetPopups())}>Cancel</button>
                        <input className="popupform-button popupform-button-blue popupform-button-right" type="submit" value="Create Project"/>
                    </div>
                </form>
            </div>
        </div>
        
    )
}