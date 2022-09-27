import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectEveryPopup, resetPopups, showPopup
} from '../features/popupSlice';
import {
    selectDraft
} from '../features/draftSlice'
import {
    selectCurrentProject
} from '../features/projectSlice'

import Header from '../pages/Header';
import Canvas from './Canvas';
import Elements from './Elements';
import Control from './Control';


export default function Editor() {
    const dispatch = useDispatch();
    const currentDraft = useSelector(selectDraft);
    const everyPopup = useSelector(selectEveryPopup);
    const currentProject = useSelector(selectCurrentProject);

    return (
        <div>
            <Header />
            <div className="editor-header-bottom">
                <h3>Editing:</h3>
                <h3>{currentDraft.draftSettings.name}</h3>
            </div>
            <Elements />
            <Canvas />
            <Control />
        </div>
    )
}