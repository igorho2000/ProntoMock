import React from "react";
import './Drop.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetPopups, showPopup,
} from '../../features/popupSlice';
import {
    starProjectDraft, unstarProjectDraft, duplicateProjectDraft, deleteProjectDraft, selectCurrentProject
} from '../../features/projectSlice';


import { useOutsideClick } from "../../Functions";
import { db } from "../../Firebase";
import { getDoc, setDoc, updateDoc, doc, deleteDoc, collection, addDoc } from "firebase/firestore";

export default function DraftDrop(props) {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();
    const currentProject = useSelector(selectCurrentProject);

    return (
        <div className="projectdrop draftdrop" style={{margin: 0}} ref={wrapperRef}>
            {/* Star Draft */}
            {props.star === true ?
            <div className="projectdrop-list" onClick={() => {
                const ProjectID = currentProject[0].id.replace(' ', '');
                var drafts = [...currentProject[0].drafts];
                var starredDrafts = [...currentProject[0].starredDrafts];
                const toMove = starredDrafts.splice(props.index, 1);
                drafts = drafts.concat(toMove);
                updateDoc(doc(db, 'projects', ProjectID), {
                    drafts: drafts,
                    starredDrafts: starredDrafts
                })
                dispatch(resetPopups());
                dispatch(unstarProjectDraft(props.index));
            }}>
                <img className="draftdrop-iconbase draftdrop-star" src="../../dashboard/unstar.svg" alt="unstar draft icon" />
                <h3>Unstar</h3>
            </div> 
            :
            <div className="projectdrop-list" onClick={() => {
                const ProjectID = currentProject[0].id.replace(' ', '');
                var drafts = [...currentProject[0].drafts];
                var starredDrafts = [...currentProject[0].starredDrafts];
                const toMove = drafts.splice(props.index, 1);
                starredDrafts = starredDrafts.concat(toMove);
                updateDoc(doc(db, 'projects', ProjectID), {
                    drafts: drafts,
                    starredDrafts: starredDrafts
                })
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
                <h3>Move To</h3>
            </div>
            :
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            dispatch(showPopup(['DraftMove', props.index]));
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/moveto.svg" alt="move to other project icon upper portion" />
                <img className="draftdrop-iconmove draftdrop-moveto" src="../../dashboard/moveto-arrow.svg" alt="move to other project icon bottom portion" />
                <h3>Move To</h3>
            </div>
            }

            {/* Duplicate Draft */}
            <div className="projectdrop-list" onClick={() => {
                dispatch(resetPopups());
                const projectID = currentProject[0].id.replace(' ', '');
                const toDuplicate = props.star ? currentProject[0].starredDrafts[props.index] : currentProject[0].drafts[props.index];
                var drafts = [...currentProject[0].drafts];
                getDoc(doc(db, 'draft', props.id)).then((result) => {
                    console.log('get')
                    const data = result.data()
                    console.log(data)
                    var updateCanvasSettings = {
                        ...data.canvasSettings,
                        name: data.canvasSettings.name + ' (Duplicate)'
                    }
                    addDoc(collection(db, 'draft'), {
                        canvasSettings: updateCanvasSettings,
                        everyObject: data.everyObject
                    }).then((result) => {
                        console.log('set')
                        dispatch(duplicateProjectDraft([props.index, props.star, result.id]))
                        drafts.push({
                            ...toDuplicate,
                            id: result.id,
                            name: toDuplicate.name + ' (Duplicate)'
                        })
                        updateDoc(doc(db, 'projects', projectID), {drafts: drafts}).then(() => {console.log('update')})
                        setDoc(doc(db, 'draft', result.id), {id: result.id}, {merge: true}).then(() => {console.log('done')})
                    })
                })
                
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/duplicate.svg" alt="duplicate draft icon bottom portion" />
                <img className="draftdrop-iconmove draftdrop-duplicate" src="../../dashboard/duplicate-duplicate.svg" alt="duplicate draft icon upper portion" />
                <h3>Duplicate</h3>
            </div>

            {/* Delete Draft */}
            <div className="projectdrop-list" onClick={() => {
                const ProjectID = currentProject[0].id.replace(' ', '');
                if (props.star) {
                    var starredDrafts = [...currentProject[0].starredDrafts];
                    starredDrafts.splice(props.index, 1)
                    updateDoc(doc(db, 'projects', ProjectID), {
                        starredDrafts: starredDrafts
                    })
                } else {
                    var drafts = [...currentProject[0].drafts];
                    drafts.splice(props.index, 1)
                    updateDoc(doc(db, 'projects', ProjectID), {
                        drafts: drafts
                    })
                }
                deleteDoc(doc(db, 'draft', props.id));
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