import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import { selectDraft } from '../features/draftSlice';
import Line from './canvascomps/Line';
import Shape from './canvascomps/Shape';
import Textbox from './canvascomps/Textbox';
import Selected from './canvascomps/Selected';

export default function Canvas() {

    const draftInfo = useSelector(selectDraft);
    const canvasInfo = draftInfo.canvasSettings;
    const zoom = draftInfo.statistics.zoom;

    const draftElementsOutput = draftInfo.everyObject.map((item) => {
        var output = '';
        
        switch (item.type) {
            case 'Text':
                output = <Textbox element={item} selected={false} />;
                break
            case 'Ellipse':
                output = <Shape element={item} ellipse={true} selected={false} />;
                break
            case 'Square':
                output = <Shape element={item} ellipse={false} selected={false} />;
                break
            case 'Line':
                output = <Line element={item} selected={false} />
                break
        }

        return output
    })

    const selectedElementsOutput = draftInfo.selectedObject.map((item) => {
        var output = '';
        
        switch (item.type) {
            case 'Text':
                output = <Textbox element={item} selected={true} />;
                break
            case 'Ellipse':
                output = <Shape element={item} ellipse={true} selected={true} />;
                break
            case 'Square':
                output = <Shape element={item} ellipse={false} selected={true} />;
                break
            case 'Line':
                output = <Line element={item} selected={true} />
                break
        }

        return output
    })

    return (
        <div className='canvas'>
            <div className='draft-cont'>
                <div className='canvas-buffer'></div>
                
                <div className='draft' style={{minWidth: `${canvasInfo.width * zoom}mm`, minHeight: `${canvasInfo.height * zoom}mm`, backgroundColor: `rgba(${canvasInfo.fillColor[0]}, ${canvasInfo.fillColor[1]}, ${canvasInfo.fillColor[2]}, ${canvasInfo.fillColor[3]})`,
                    }} >
                    <div className='margin' style={{marginTop: `${(canvasInfo.margin[0] - 0.3) * zoom}mm`, marginRight: `${canvasInfo.margin[1]  * zoom}mm`, marginLeft: `${(canvasInfo.margin[3]) * zoom}mm`, minWidth: `${(canvasInfo.width - canvasInfo.margin[1] - canvasInfo.margin[3]) * zoom}mm`, minHeight: `${(canvasInfo.height - canvasInfo.margin[0] - canvasInfo.margin[2]) * zoom}mm`}}></div>
                    {draftElementsOutput}
                    <Selected />
                    {selectedElementsOutput}
                </div>
                
                <div className='canvas-buffer'></div>
               
            </div>
            
        </div>
    )
}