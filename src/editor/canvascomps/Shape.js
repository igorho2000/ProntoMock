import React from 'react';

import { selectDraft } from '../../features/draftSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Shape(props) {

    const draftInfo = useSelector(selectDraft);

    const element = props.element;
    const zoom = draftInfo.statistics.zoom;

    return (
        <div style={{
            position: 'absolute', width:`${element.width / draftInfo.canvasSettings.width * 100}%`, height:`${element.height / draftInfo.canvasSettings.height * 100}%`,
            left: `${element.x / draftInfo.canvasSettings.width * 100}%`, top: `${element.y / draftInfo.canvasSettings.height * 100}%`, rotate: `${element.rotate}deg`, 
            borderRadius: props.ellipse ? '50%' : `${element.radius[0] * zoom} ${element.radius[1] * zoom} ${element.radius[2] * zoom} ${element.radius[3] * zoom}`, zIndex: element.zIndex,
            backgroundColor: `rgba(${element.fillColor[0]},${element.fillColor[1]},${element.fillColor[2]},${element.fillColor[3]})`,
            borderStyle: element.borderStyle, borderWidth: `${element.borderWidth * zoom}mm`, borderColor: `rgba(${element.borderColor[0]},${element.borderColor[1]},${element.borderColor[2]},${element.borderColor[3]})`
        }}></div>
    )
}