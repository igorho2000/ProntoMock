import React from "react";
import './Drop.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups, showPopup,
    selectEveryPopup,
} from '../../features/popupSlice';
import {
    switchProject, starProjectDraft, unstarProjectDraft, duplicateProjectDraft, deleteProjectDraft,
    selectEveryProject, selectCurrentProject,
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";

export default function DraftDrop(props) {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();
    const currentProject = useSelector(selectCurrentProject);

    return (
        <div className="projectdrop draftdrop" ref={wrapperRef}>
            
            {props.star ?
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(unstarProjectDraft(props.index));
            }}>
                <img className="draftdrop-iconbase draftdrop-star" src="../../dashboard/unstar.svg" />
                <h3>Unstar</h3>
            </div> 
            :
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(starProjectDraft(props.index));
            }}>
                <img className="draftdrop-iconbase draftdrop-star" src="../../dashboard/star.svg" />
                <h3>Star</h3>
            </div>
            }
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/rename.svg" />
                <img className="draftdrop-iconmove draftdrop-rename" src="../../dashboard/rename-pencil.svg" />
                <h3>Rename</h3>
            </div>
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(duplicateProjectDraft([props.index, props.star]))
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/duplicate.svg" />
                <img className="draftdrop-iconmove draftdrop-duplicate" src="../../dashboard/duplicate-duplicate.svg" />
                <h3>Duplicate</h3>
            </div>
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(deleteProjectDraft([props.index, props.star]))
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/delete.svg" />
                <img className="draftdrop-iconmove draftdrop-delete" src="../../dashboard/delete-lid.svg" />
                <h3>Delete</h3>
            </div>
        </div>
    )
}