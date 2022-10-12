import React from "react";
import '../../pages/dashboardcomps/Drop.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetPopups, selectEveryPopup
} from '../../features/popupSlice';

import { selectDraft, SortEveryObjectByZ, SaveDraft, PasteSelected, UndoAction} from "../../features/draftSlice";

import { useOutsideClick } from "../../Functions";
import * as htmlToImage from 'html-to-image';


export default function CanvasRightClick() {

    const popup = useSelector(selectEveryPopup);
    const draftInfo = useSelector(selectDraft);
    const selected = draftInfo.selectedObject;
    const canvasSettings = draftInfo.canvasSettings;
    const zoom = draftInfo.statistics.zoom;

    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();
    
    return (
        <div className="projectdrop selectright" style={{left: popup.Coordinates[0] < window.innerWidth - 450 ? popup.Coordinates[0] - 13 : popup.Coordinates[0] - 160, top: popup.Coordinates[1] < window.innerHeight - 90 ? popup.Coordinates[1] + 3 : popup.Coordinates[1] - 80, minHeight: 'fit-content', minWidth: 'fit-content', zIndex: '10000003'}} ref={wrapperRef}>
            <div className="projectdrop-list" onClick={() => {
                if (localStorage.getItem('clipboard') === null) {
                    return
                }
                const paste = localStorage.getItem('clipboard').split('/');
                paste.splice(-1,1);
                const pasteArray = paste.map((item) => (
                  JSON.parse(item)
                ))
                dispatch(PasteSelected(pasteArray));
                dispatch(SortEveryObjectByZ())
                dispatch(SaveDraft());
                dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../properties/paste.svg" alt="copy icon top portion" />
                <img className="draftdrop-iconmove selectright-paste" src="../../properties/paste-top.svg" alt="copy icon bottom portion" />
                <h3>Paste</h3>
                <p>Ctrl-V</p>
            </div>
            <div className="projectdrop-list" onClick={(ev) => {
                ev.preventDefault();
                dispatch(UndoAction());
                dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase selectright-undo" src="../../properties/undo-white.svg" alt="cut bottom portion" />
                <h3>Undo</h3>
                <p>Ctrl-Z</p>
            </div>
        </div>
    )
}