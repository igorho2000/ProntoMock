import React from 'react';

import { selectDraft } from '../../features/draftSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Line(props) {

    const draftInfo = useSelector(selectDraft);

    const element = props.element;
    const zoom = draftInfo.statistics.zoom;

    return (
        <hr style={{
            position: 'absolute', width:`${element.width / draftInfo.canvasSettings.width * 100}%`, height:'0',
            left: `${element.x / draftInfo.canvasSettings.width * 100}%`, top: `${element.y / draftInfo.canvasSettings.height * 100}%`, rotate: `${element.rotate}deg`, 
            zIndex: element.zIndex, borderLeftStyle: 'none', borderRightStyle: 'none', borderBottomStyle: 'none',
            borderTopStyle: element.borderStyle, borderTopWidth: `${element.borderWidth * zoom}mm`, borderTopColor: `rgba(${element.borderColor[0]},${element.borderColor[1]},${element.borderColor[2]},${element.borderColor[3]})`
        }} />
    )
}