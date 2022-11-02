import React from "react";
import './Drop.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    switchProject, renameProject, deleteProject,
    selectCurrentProject,
    selectEveryProject,
} from '../../features/projectSlice';
import { selectProjectCodes, selectUser, changeUserProjects } from "../../features/userSlice";

import { db } from "../../Firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";

import { useOutsideClick } from "../../Functions";

export default function ProjectSettings() {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const currentProject = useSelector(selectCurrentProject);
    const everyProject = useSelector(selectEveryProject);
    const projectCodes = useSelector(selectProjectCodes);
    const user = useSelector(selectUser);

    const [nameValue, setNameValue] = React.useState(currentProject[0].name);
    // const [emailValue, setEmailValue] = React.useState({
    //     email: '',
    //     emailCorrect: false,
    //     error: "",
    // });

    function handleRenameChange(event) {
        setNameValue(event.target.value);
    }

    // function handleEmailChange(event) {
    //     setEmailValue((state) => ({
    //         ...state,
    //         email: event.target.value
    //     }));
    //     if (event.target.value.includes('@') === false || event.target.value[0] === '@' || event.target.value[event.target.value.length - 1] === '@') {
    //         setEmailValue((state) => ({
    //             ...state,
    //             emailCorrect: false,
    //         }));
    //         return
    //     }
    //     setEmailValue((state) => ({
    //         ...state,
    //         emailCorrect: true,
    //     }));
    // }

    function handleDeletion() {
        const projectID = currentProject[0].id.replace(' ', '');
        var updatedProjectCodes = [...projectCodes];
        updatedProjectCodes.splice(updatedProjectCodes.indexOf(projectID), 1);
        var draftIDs = currentProject[0].drafts.map((item) => (item.id));
        draftIDs.concat(currentProject[0].starredDrafts.map((item) => (item.id)));
        for (let i = 0; i < draftIDs.length; i++) {
            const draftID = draftIDs[i].replace(' ', '');
            deleteDoc(doc(db, 'draft', draftID));
        }
        deleteDoc(doc(db, 'projects', projectID));
        updateDoc(doc(db, 'user', user.id), {projects: updatedProjectCodes});
        dispatch(changeUserProjects(updatedProjectCodes));
        dispatch(deleteProject());
        dispatch(switchProject(0));
        dispatch(resetPopups());
    }

    // const team = currentProject[0].team.map((item) => {
    //     if (item === user.id) {
    //         return (
    //             <div className="popupform-teamcont" key={item} >
    //                 <p>{user.name}</p>
    //                 <button className="popupform-button popupform-button-gray" style={{fontSize: '0.8rem', boxShadow: 'none', padding: '3px 8px'}}>Leave</button>
    //             </div>
    //         )
    //     } else {
    //         getAuth().then((userRecord) => {
    //             return (
    //                 <div className="popupform-teamcont" key={item} >
    //                     <p>{userRecord.displayName}</p>
    //                     <button className="popupform-button popupform-button-gray" style={{fontSize: '0.8rem', boxShadow: 'none', padding: '3px 8px'}}>Remove</button>
    //                 </div>
    //             )
    //         })
    //     }
        
    // })

    return (
        <div className="popupform-positioner">
            <div className="popupform" ref={wrapperRef} >
                <h4 className="popupform-title">Project Settings</h4>
                <form className="popupform-form">
                    <div className="popupform-input">
                        <label>Rename</label>
                        <input type="text" value={nameValue} onChange={handleRenameChange} />
                    </div>
                </form>
                <div className="popupform-input">
                    <label>Team</label>
                    <input type="text" placeholder='Coming Soon...' style={{width: '140px', marginRight: '40px'}} disabled />
                    <button className="popupform-button popupform-button-blue popupform-button-ininput" onClick={(event) => {event.preventDefault()}}>Add</button>
                </div>
                <div className="popupform-teamcont">
                       <p>{user.name}</p>
                       <button className="popupform-button popupform-button-gray"  onClick={(event) => {event.preventDefault()}} style={{fontSize: '0.8rem', boxShadow: 'none', padding: '3px 8px'}}>Leave</button>
                </div>
                <div className="popupform-buttoncont ">
                    <button className="popupform-button popupform-button-blue" onClick={() => {
                        if (currentProject.name !== nameValue) {
                            dispatch(renameProject(nameValue));
                            const projectID = currentProject[0].id.replace(' ', '');
                            updateDoc((doc(db, 'projects', projectID)), {name: nameValue});
                        }
                        dispatch(resetPopups());
                    }}>Finish</button>
                    {everyProject.length > 0 &&
                    <button className="popupform-button popupform-button-red popupform-right" onClick={handleDeletion}>Delete Project</button>
                    }
                </div>
                {/* {emailValue.error !== '' &&
                    <h5 style={{marginTop: '16px', color: 'orange'}}>{emailValue.error}</h5>
                } */}
            </div>
        </div>
        
    )
}