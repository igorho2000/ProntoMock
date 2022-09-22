import React from "react";
import './Drop.css';

import { useDispatch } from 'react-redux';
import {
    resetPopups, showPopup,
} from '../../features/popupSlice';
import {
    starProjectDraft, unstarProjectDraft, duplicateProjectDraft, deleteProjectDraft,
} from '../../features/projectSlice';


import { useOutsideClick } from "../../Functions";

export default function DraftDrop(props) {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    return (
        <div className="projectdrop draftdrop" ref={wrapperRef}>
            {/* Star Draft */}
            {props.star === true ?
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(unstarProjectDraft(props.index));
            }}>
                <img className="draftdrop-iconbase draftdrop-star" src="../../dashboard/unstar.svg" alt="unstar draft icon" />
                <h3>Unstar</h3>
            </div> 
            :
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(starProjectDraft(props.index));
            }}>
                <img className="draftdrop-iconbase draftdrop-star" src="../../dashboard/star.svg" alt="star draft icon"/>
                <h3>Star</h3>
            </div>
            }

            {/* Rename Draft */}
            {props.star === true ?
            <div className="projectdrop-list" onClick={() => {
                dispatch(resetPopups());
                dispatch(showPopup(['StarredDraftRename', props.index]));
                }}>
                <img className="draftdrop-iconbase" src="../../dashboard/rename.svg" alt="rename draft icon bottom portion"/>
                <img className="draftdrop-iconmove draftdrop-rename" src="../../dashboard/rename-pencil.svg" alt="rename draft icon upper portion"/>
                <h3>Rename</h3>
            </div> 
            :
            <div className="projectdrop-list" onClick={() => {
                dispatch(resetPopups());
                dispatch(showPopup(['DraftRename', props.index]));
                }}>
                <img className="draftdrop-iconbase" src="../../dashboard/rename.svg" alt="rename draft icon bottom portion" />
                <img className="draftdrop-iconmove draftdrop-rename" src="../../dashboard/rename-pencil.svg" alt="rename draft icon upper portion" />
                <h3>Rename</h3>
            </div>
            }

            {/* Move Draft */}
            {
            props.star ?
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(showPopup(['StarredDraftMove', props.index]));
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/moveto.svg" alt="move to other project icon upper portion" />
                <img className="draftdrop-iconmove draftdrop-moveto" src="../../dashboard/moveto-arrow.svg" alt="move to other project icon bottom portion" />
                <h3>Move To...</h3>
            </div>
            :
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(showPopup(['DraftMove', props.index]));
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/moveto.svg" alt="move to other project icon upper portion" />
                <img className="draftdrop-iconmove draftdrop-moveto" src="../../dashboard/moveto-arrow.svg" alt="move to other project icon bottom portion" />
                <h3>Move To...</h3>
            </div>
            }

            {/* Duplicate Draft */}
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(duplicateProjectDraft([props.index, props.star]))
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/duplicate.svg" alt="duplicate draft icon bottom portion" />
                <img className="draftdrop-iconmove draftdrop-duplicate" src="../../dashboard/duplicate-duplicate.svg" alt="duplicate draft icon upper portion" />
                <h3>Duplicate</h3>
            </div>

            {/* Delete Draft */}
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(deleteProjectDraft([props.index, props.star]))
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/delete.svg" alt="delete draft icon bottom portion" />
                <img className="draftdrop-iconmove draftdrop-delete" src="../../dashboard/delete-lid.svg" alt="delete draft icon upper portion" />
                <h3 style={{color: "#de8787", fontWeight: "700"}}>Delete</h3>
            </div>
            
        </div>
    )
}