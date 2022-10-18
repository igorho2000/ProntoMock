import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectEveryPopup, resetPopups, showPopup
} from '../features/popupSlice';
import {
    selectDraft, ToggleMove, SaveDraft
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
    const draftInfo = useSelector(selectDraft);
    const everyPopup = useSelector(selectEveryPopup);
    const currentProject = useSelector(selectCurrentProject);

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
            <Elements />
            <Canvas />
            <Control />
        </div>
    )
}