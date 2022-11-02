import React from "react";
import '../../pages/dashboardcomps/Drop.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetPopups, selectEveryPopup
} from '../../features/popupSlice';

import { selectDraft, DeleteSelected, SortEveryObjectByZ, SaveDraft,
MoveSelected, DuplicateSelected } from "../../features/draftSlice";

import { useOutsideClick } from "../../Functions";


export default function SelectedRightClick() {

    const popup = useSelector(selectEveryPopup);
    const draftInfo = useSelector(selectDraft);
    const selected = draftInfo.selectedObject;

    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    // function savepng() {
    //     htmlToImage.toPng(document.querySelector('.selectedExport')).then(
    //         function (dataUrl) {
    //             var element = document.createElement('a');
    //             element.setAttribute('href', dataUrl);
    //             element.setAttribute('download',`${canvasSettings.name}-element.png`);
    //             element.style.display = 'none';
    //             document.body.appendChild(element);
    //             element.click();
    //             document.body.removeChild(element);
    //         }
    //     )
    // }
    
    return (
        <div className="projectdrop selectright" style={{left: popup.Coordinates[0] < window.innerWidth - 510 ? popup.Coordinates[0] - 13 : popup.Coordinates[0] - 210, top: popup.Coordinates[1] < window.innerHeight - 140 ? popup.Coordinates[1] + 3 : popup.Coordinates[1] - 140, minHeight: 'fit-content', minWidth: 'fit-content', zIndex: '10000003'}} ref={wrapperRef}>
            <div className="projectdrop-list" onClick={() => {
                var selectedString = ''
                selected.forEach((element) => {
                    selectedString += JSON.stringify(element) + '/}{|';
                  })
                localStorage.setItem('clipboard', selectedString);
                dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../properties/copy.svg" alt="copy icon top portion" />
                <img className="draftdrop-iconmove selectright-copy" src="../../properties/copy-copy.svg" alt="copy icon bottom portion" />
                <h3>Copy</h3>
                <p>Ctrl-C</p>
            </div>
            <div className="projectdrop-list" onClick={() => {
                var selectedString = ''
                selected.forEach((element) => {
                    selectedString += JSON.stringify(element) + '/}{|';
                  })
                localStorage.setItem('clipboard', selectedString);
                dispatch(DeleteSelected());
                dispatch(SortEveryObjectByZ());
                dispatch(SaveDraft());
                dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../properties/cut.svg" alt="cut bottom portion" />
                <img className="draftdrop-iconmove selectright-cut" src="../../properties/cut-top.svg" alt="cut top portion" />
                <h3>Cut</h3>
                <p>Ctrl-X</p>
            </div>
            <div className="projectdrop-list" onClick={(ev) => {
                ev.preventDefault();
                dispatch(DuplicateSelected());
                dispatch(MoveSelected([10, 10]));
                dispatch(SortEveryObjectByZ())
                dispatch(SaveDraft());
                dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../properties/duplicate.svg" alt="duplicate right portion" />
                <img className="draftdrop-iconmove selectright-duplicate" src="../../properties/duplicate-duplicate.svg" alt="duplicate left portion" />
                <h3>Duplicate</h3>
                <p>Ctrl-D</p>
            </div>
            <div className="projectdrop-list" onClick={(ev) => {
                ev.preventDefault();
                dispatch(DeleteSelected());
                dispatch(SortEveryObjectByZ())
                dispatch(SaveDraft());
                dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../properties/delete.svg" alt="delete bin" />
                <img className="draftdrop-iconmove selectright-delete" src="../../properties/delete-lid.svg" alt="delete lid" />
                <h3>Delete</h3>
                <p>Delete</p>
            </div>
            {/* <div className="projectdrop-list" onClick={() => {
                savepng();
                dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../properties/download.svg" alt="download bottom" />
                <img className="draftdrop-iconmove selectright-download" src="../../properties/download-top.svg" alt="download top" />
                <h3>Export As PNG</h3>
            </div> */}
        </div>
    )
}