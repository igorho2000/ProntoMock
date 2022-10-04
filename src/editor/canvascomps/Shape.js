import React from 'react';

import { selectDraft, SelectObject } from '../../features/draftSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Shape(props) {
    const dispatch = useDispatch();

    const draftInfo = useSelector(selectDraft);

    const element = props.element;
    const zoom = draftInfo.statistics.zoom;

    return (
        <div style={{
            cursor: 'pointer', position: 'absolute', width:`${element.width / draftInfo.canvasSettings.width * 100}%`, height:`${element.height / draftInfo.canvasSettings.height * 100}%`,
            left: `${element.x / draftInfo.canvasSettings.width * 100}%`, top: `${element.y / draftInfo.canvasSettings.height * 100}%`, transform: `rotate(${element.rotate}deg)`, 
            borderRadius: props.ellipse ? '50%' : `${element.radius[0] * zoom}mm ${element.radius[1] * zoom}mm ${element.radius[2] * zoom}mm ${element.radius[3] * zoom}mm`, zIndex: element.zIndex,
            backgroundColor: `rgba(${element.fillColor[0]},${element.fillColor[1]},${element.fillColor[2]},${element.fillColor[3]})`,
            borderStyle: element.borderStyle, borderWidth: `${element.borderWidth * zoom}mm`, borderColor: `rgba(${element.borderColor[0]},${element.borderColor[1]},${element.borderColor[2]},${element.borderColor[3]})`
        }} onClick={() => dispatch(SelectObject(props.index))}></div>
    )
}