import React from 'react';
import '../editor.css';

import { useSelector, useDispatch } from 'react-redux';

import { selectDraft, ChangeSelectedProperties, SaveDraft } from '../../features/draftSlice';

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
                    <img src="../properties/align_horizontal_left.svg" onClick={AlignLeft} />
                    <img src="../properties/align_horizontal_center.svg" onClick={AlignHorizontalCenter}/>
                    <img src="../properties/align_horizontal_right.svg" onClick={AlignRight} />
                    <img src="../properties/align_vertical_top.svg" onClick={AlignTop} />
                    <img src="../properties/align_vertical_center.svg" onClick={AlignVerticalCenter} />
                    <img src="../properties/align_vertical_bottom.svg" onClick={AlignBottom} />
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