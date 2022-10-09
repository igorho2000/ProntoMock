import React from 'react';
import '../editor.css';

import { useSelector, useDispatch } from 'react-redux';

import { selectDraft, ChangeSelectedProperties, ChangeEachSelectedProperties, SaveDraft } from '../../features/draftSlice';

import { getSelectedItemStats, getSelectedStats } from '../../Functions';

export default function ControlAlignSelection() {

    const dispatch = useDispatch();

    const draftInfo = useSelector(selectDraft);
    const selected = draftInfo.selectedObject;

    const selectedItemStats = getSelectedItemStats(selected);
    const selectedStats = getSelectedStats(selectedItemStats);

    function AlignLeft() {
        const output = selectedItemStats.map((item) => {
            return selectedStats.leftBound + item.widthDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['x', output]));
        dispatch(SaveDraft());
    }

    function AlignRight() {
        const output = selectedItemStats.map((item) => {
            return selectedStats.rightBound - item.visualWidth + item.widthDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['x', output]));
        dispatch(SaveDraft());
    }
    function AlignTop() {
        const output = selectedItemStats.map((item) => {
            return selectedStats.topBound + item.heightDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['y', output]));
        dispatch(SaveDraft());
    }

    function AlignBottom() {
        const output = selectedItemStats.map((item) => {
            return selectedStats.bottomBound - item.visualHeight + item.heightDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['y', output]));
        dispatch(SaveDraft());
    }
    function AlignHorizontalCenter() {
        const output = selectedItemStats.map((item) => {
            return selectedItemStats[0].centerLeft - item.visualWidth / 2 + item.widthDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['x', output]));
        dispatch(SaveDraft());
    }
    function AlignVerticalCenter() {
        const output = selectedItemStats.map((item) => {
            return selectedItemStats[0].centerTop - item.visualHeight / 2 + item.heightDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['y', output]));
        dispatch(SaveDraft());
    }

    return (
        <div className='control-title'>
            <div>
                <h4 className='control-group-title'>Align Selection</h4>
            </div>
            <div className='control-group'>
                <form className='control-form-long'>
                    <img src="../properties/align_horizontal_left.svg" onClick={AlignLeft} />
                    <img src="../properties/align_horizontal_center.svg" onClick={AlignHorizontalCenter}/>
                    <img src="../properties/align_horizontal_right.svg" onClick={AlignRight} />
                    <img src="../properties/align_vertical_top.svg" onClick={AlignTop} />
                    <img src="../properties/align_vertical_center.svg" onClick={AlignVerticalCenter} />
                    <img src="../properties/align_vertical_bottom.svg" onClick={AlignBottom} />
                    <img src="../properties/horizontal_distribute.svg" />
                    <img src="../properties/vertical_distribute.svg" />
                </form>
                <form className='control-form'>
                    <label style={{width: "5.5rem"}}>Move to Front</label>
                    <img src="../properties/move_up.svg" />
                </form>
                <form className='control-form'>
                    <label style={{width: "5.5rem"}}>Move to Back</label>
                    <img src="../properties/move_down.svg" />
                </form>
            </div>
        </div>
    )
}