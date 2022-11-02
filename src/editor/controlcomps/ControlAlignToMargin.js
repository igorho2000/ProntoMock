import React from 'react';
import '../editor.css';

import { useSelector, useDispatch } from 'react-redux';

import { selectDraft, ChangeSelectedProperties, SaveDraft, MoveSelectedToFront, MoveSelectedToBack } from '../../features/draftSlice';

import { getSelectedItemStats } from '../../Functions';

export default function ControlAlignToMargin() {

    const dispatch = useDispatch();

    const draftInfo = useSelector(selectDraft);
    const margin = draftInfo.canvasSettings.margin;
    const pageWidth = draftInfo.canvasSettings.width;
    const pageHeight = draftInfo.canvasSettings.height;
    const selected = draftInfo.selectedObject;

    const selectedItemStats = getSelectedItemStats(selected);

    function AlignLeft() {
        const output = +margin[3] + +selectedItemStats[0].widthDif;
        dispatch(ChangeSelectedProperties(['x', output]));
        dispatch(SaveDraft());
    }

    function AlignRight() {
        const output = pageWidth - +margin[1] - +selectedItemStats[0].visualWidth + +selectedItemStats[0].widthDif;
        dispatch(ChangeSelectedProperties(['x', output]));
        dispatch(SaveDraft());
    }
    function AlignTop() {
        const output = +margin[0] + +selectedItemStats[0].heightDif;
        dispatch(ChangeSelectedProperties(['y', output]));
        dispatch(SaveDraft());
    }

    function AlignBottom() {
        const output = pageHeight - +margin[2] - +selectedItemStats[0].visualHeight + +selectedItemStats[0].heightDif;
        dispatch(ChangeSelectedProperties(['y', output]));
        dispatch(SaveDraft());
    }
    function AlignHorizontalCenter() {
        const output = (pageWidth - +margin[1] - +margin[3] - +selectedItemStats[0].visualWidth) / 2  + +margin[3] + +selectedItemStats[0].widthDif;
        dispatch(ChangeSelectedProperties(['x', output]));
        dispatch(SaveDraft());
    }
    function AlignVerticalCenter() {
        const output = (pageHeight - +margin[0] - +margin[2] - +selectedItemStats[0].visualHeight) / 2  + +margin[0] + +selectedItemStats[0].heightDif;
        dispatch(ChangeSelectedProperties(['y', output]));
        dispatch(SaveDraft());
    }


    return (
        <div className='control-title'>
            <div>
                <h4 className='control-group-title'>Align to Margin</h4>
            </div>
            <div className='control-group'>
                <form className='control-form-long'>
                    <img src="../properties/align_horizontal_left.svg" onClick={AlignLeft} alt='align left' />
                    <img src="../properties/align_horizontal_center.svg" onClick={AlignHorizontalCenter} alt='align horizontal center'/>
                    <img src="../properties/align_horizontal_right.svg" onClick={AlignRight} alt='align right' />
                    <img src="../properties/align_vertical_top.svg" onClick={AlignTop} alt='align top' />
                    <img src="../properties/align_vertical_center.svg" onClick={AlignVerticalCenter} alt='align vertical center' />
                    <img src="../properties/align_vertical_bottom.svg" onClick={AlignBottom} alt='align bottom' />
                </form>
                <form className='control-form'>
                    <label style={{width: "5.5rem"}}>Move to Front</label>
                    <img src="../properties/move_up.svg" onClick={() => {
                        dispatch(MoveSelectedToFront());
                        dispatch(SaveDraft());
                    }} alt='move to front' />
                </form>
                <form className='control-form'>
                    <label style={{width: "5.5rem"}}>Move to Back</label>
                    <img src="../properties/move_down.svg" onClick={() => {
                        dispatch(MoveSelectedToBack());
                        dispatch(SaveDraft());
                    }} alt='move to back' />
                </form>
            </div>
        </div>
    )
}