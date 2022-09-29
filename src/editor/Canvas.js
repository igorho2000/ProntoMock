import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import { selectDraft } from '../features/draftSlice';

export default function Canvas() {

    const draftInfo = useSelector(selectDraft);
    const canvasInfo = draftInfo.canvasSettings;

    return (
        <div className='canvas'>
            <div className='draft-cont'>
                <div className='canvas-buffer'></div>
                <div style={{minWidth: `${canvasInfo.width}mm`, minHeight: `${canvasInfo.height}mm`, backgroundColor: `rgba(${canvasInfo.fillColor[0]}, ${canvasInfo.fillColor[1]}, ${canvasInfo.fillColor[2]}, ${canvasInfo.fillColor[3]})`}}>

                </div>
                <div className='canvas-buffer'></div>
                <div className='margin' style={{marginTop: `${canvasInfo.margin[0] - 0.3}mm`, marginRight: `${canvasInfo.margin[1]}mm`, marginLeft: `${canvasInfo.margin[3]}mm`, minWidth: `${canvasInfo.width - canvasInfo.margin[1] - canvasInfo.margin[3]}mm`, minHeight: `${canvasInfo.height - canvasInfo.margin[0] - canvasInfo.margin[2]}mm`}}></div>
            </div>
            
        </div>
    )
}