import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import { selectDraft, MoveSelected } from '../features/draftSlice';
import Line from './canvascomps/Line';
import Shape from './canvascomps/Shape';
import Textbox from './canvascomps/Textbox';
import Selected from './canvascomps/Selected';

export default function Canvas() {

    const draftInfo = useSelector(selectDraft);
    const canvasInfo = draftInfo.canvasSettings;
    const selected = draftInfo.selectedObject;
    const zoom = draftInfo.statistics.zoom;

    const dispatch = useDispatch();

    const draftElementsOutput = draftInfo.everyObject.map((item, index) => {
        var output = '';
        
        switch (item.type) {
            case 'Text':
                output = <Textbox element={item} selected={false} index={index}/>;
                break
            case 'Ellipse':
                output = <Shape element={item} ellipse={true} selected={false} index={index}/>;
                break
            case 'Square':
                output = <Shape element={item} ellipse={false} selected={false} index={index}/>;
                break
            case 'Line':
                output = <Line element={item} selected={false} index={index}/>
                break
        }

        return output
    })

    const selectedElementsOutput = draftInfo.selectedObject.map((item, index) => {
        var output = '';
        
        switch (item.type) {
            case 'Text':
                output = <Textbox element={item} selected={true} index={index} />;
                break
            case 'Ellipse':
                output = <Shape element={item} ellipse={true} selected={true}  />;
                break
            case 'Square':
                output = <Shape element={item} ellipse={false} selected={true}  />;
                break
            case 'Line':
                output = <Line element={item} selected={true}  />
                break
        }

        return output
    })


    return (
        <div className='canvas' onMouseMove={(event) => {
            if (draftInfo.statistics.move === true) {
                dispatch(MoveSelected([+event.movementX, +event.movementY]))
            }
        }}>
            <div className='draft-cont'>
                <div className='canvas-buffer'></div>
                
                <div id='draft' className='draft' style={{minWidth: `${canvasInfo.width * zoom}mm`, minHeight: `${canvasInfo.height * zoom}mm`, backgroundColor: `rgba(${canvasInfo.fillColor[0]}, ${canvasInfo.fillColor[1]}, ${canvasInfo.fillColor[2]}, ${canvasInfo.fillColor[3]})`,
                    }} >
                    <div className='margin' style={{marginTop: `${(canvasInfo.margin[0] - 0.3) * zoom}mm`, marginRight: `${canvasInfo.margin[1]  * zoom}mm`, marginLeft: `${(canvasInfo.margin[3]) * zoom}mm`, minWidth: `${(canvasInfo.width - canvasInfo.margin[1] - canvasInfo.margin[3]) * zoom}mm`, minHeight: `${(canvasInfo.height - canvasInfo.margin[0] - canvasInfo.margin[2]) * zoom}mm`}}></div>
                    {draftElementsOutput}
                    {selected.length > 0 && <Selected />}
                    {selected.length > 0 && selectedElementsOutput}
                </div>
                
                <div className='canvas-buffer'></div>
               
            </div>
            
        </div>
    )
}