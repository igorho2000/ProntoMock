import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    selectEveryPopup, resetPopups, showPopup
} from '../features/popupSlice';
import {
    selectDraft, ToggleMove, SaveDraft, InitializeDraft
} from '../features/draftSlice'
import {
    selectCurrentProject, selectEveryProject
} from '../features/projectSlice'

import Header from '../pages/Header';
import Canvas from './Canvas';
import Elements from './Elements';
import Control from './Control';

import {db} from '../Firebase';
import { doc, getDoc, addDoc, setDoc, collection } from "firebase/firestore";

export default function Editor() {
    const dispatch = useDispatch();
    const draftInfo = useSelector(selectDraft);
    const currentProject = useSelector(selectCurrentProject);
    const everyProject = useSelector(selectEveryProject);
    
    const [loading, setLoading] = React.useState({
        inProgress: true,
        message: 'Authenticating...',
    });

    let { id } = useParams();

    React.useEffect(() => {
        if (id.length < 20) {
            setLoading((state) => ({
                ...state,
                message: 'URL incorrect or not authorized to view content.'
            }))
            return
        }
        var allDraftIDs = {}
        currentProject[0].drafts.forEach((element, index) => {allDraftIDs[element.id] = ['currentProject', 0, 'drafts', index]});
        currentProject[0].starredDrafts.forEach((element, index) => { allDraftIDs[element.id]= ['currentProject', 0, 'starredDrafts', index]});
        for (let i = 0; i < everyProject.length; i++) {
            everyProject[i].drafts.forEach((element, index) => {allDraftIDs[element.id]= ['everyProject', i, 'drafts', index]});
            everyProject[i].starredDrafts.forEach((element, index) => {allDraftIDs[element.id]= ['everyProject', i, 'starredDrafts', index]});
        }
        console.log(allDraftIDs)
        if (allDraftIDs[id] === undefined) {
            setLoading((state) => ({
                ...state,
                message: 'URL incorrect or not authorized to view content.'
            }))
            return
        }
        setLoading((state) => ({
            ...state,
            message: 'Retrieving Your Document'
        }))
        getDoc(doc(db, 'draft', id)).then((result) => {
            dispatch(InitializeDraft([id, result.data(), allDraftIDs[id]]));
            setLoading({
                inProgress: false,
                message: '',
            })
        })
    }, [id])

    return (
        <div onMouseUp={() => {
            if (draftInfo.statistics.move === true || draftInfo.statistics.sizeX === true
                || draftInfo.statistics.sizeY === true || draftInfo.statistics.sizeXY === true) {
                dispatch(SaveDraft());
            }
            if (draftInfo.statistics.selected !== 'none') {
                dispatch(ToggleMove(['move', false]))
                dispatch(ToggleMove(['sizeX', false]))
                dispatch(ToggleMove(['sizeY', false]))
                dispatch(ToggleMove(['sizeXY', false]))
            }
            
        }} >
            <Header />
            
            {draftInfo.id === id && <Elements />}
            {draftInfo.id === id && <Canvas />}
            {draftInfo.id === id && <Control />}
            {draftInfo.id !== id && <div style={{position: 'fixed', top: '80px', left: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center'}}>
                <p>{loading.message}</p>
                <div className='control-loading-circle' style={{marginTop: 0}}></div>
            </div>}
        </div>
    )
}