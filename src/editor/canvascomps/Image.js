import React from 'react';

import { selectDraft, SelectObject, SortEveryObjectByZ } from '../../features/draftSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Image(props) {
    const dispatch = useDispatch();

    const draftInfo = useSelector(selectDraft);

    const element = props.element;
    const zoom = draftInfo.statistics.zoom;

    return (
        <img className='element' src={element.src} style={{
            cursor: 'pointer', position: 'absolute', width:`${element.width / draftInfo.canvasSettings.width * 100}%`, height:`${element.height / draftInfo.canvasSettings.height * 100}%`,
            left: `${element.x / draftInfo.canvasSettings.width * 100}%`, top: `${element.y / draftInfo.canvasSettings.height * 100}%`, transform: `rotate(${element.rotate}deg)`, 
            borderRadius: `${element.radius[0] * zoom}mm ${element.radius[1] * zoom}mm ${element.radius[2] * zoom}mm ${element.radius[3] * zoom}mm`, zIndex: element.zIndex,
            borderStyle: element.borderStyle, borderWidth: `${element.borderWidth * zoom}mm`, borderColor: `rgba(${element.borderColor[0]},${element.borderColor[1]},${element.borderColor[2]},${element.borderColor[3]})`
        }} onClick={() => {
            dispatch(SelectObject(props.index));
            // dispatch(SortEveryObjectByZ());
        }}></img>
    )
}