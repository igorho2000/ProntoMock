import React from 'react';

import { selectDraft } from '../../features/draftSlice';

import { useSelector, useDispatch } from 'react-redux';

export default function Textbox(props) {

    const draftInfo = useSelector(selectDraft);

    const element = props.element;
    const zoom = draftInfo.statistics.zoom;

    const [textValue, setTextValue] = React.useState(element.value)

    function HandleChange(event) {
        setTextValue(event.target.value)
    }
    
    // Need to hook up textvalue to store (Maybe split up the rendering of every vs selected object)

    return (
        <textarea value={textValue} readOnly={props.selected ? false : true} onChange={HandleChange} style={{
            overflow: "hidden", position: 'absolute', resize: 'none', width:`${element.width / draftInfo.canvasSettings.width * 100}%`, height:`${element.height / draftInfo.canvasSettings.height * 100}%`,
            left: `${element.x / draftInfo.canvasSettings.width * 100}%`, top: `${element.y / draftInfo.canvasSettings.height * 100}%`, rotate: `${element.rotate}deg`, borderRadius: `${element.radius[0] * zoom}mm ${element.radius[1] * zoom}mm ${element.radius[2] * zoom}mm ${element.radius[3] * zoom}mm`, zIndex: element.zIndex,
            fontWeight: element.bold ? '700' : '400', textDecoration: element.underline ? 'underline' : 'none', fontStyle: element.italic ? 'italic' : 'normal',
            fontFamily: element.font, textAlign: element.textAlign, fontSize: `${element.size * zoom}pt`,
            color: `rgba(${element.textColor[0]},${element.textColor[1]},${element.textColor[2]},${element.textColor[3]})`, backgroundColor: `rgba(${element.fillColor[0]},${element.fillColor[1]},${element.fillColor[2]},${element.fillColor[3]})`,
            borderStyle: element.borderStyle, borderWidth: `${element.borderWidth * zoom}mm`, borderColor: `rgba(${element.borderColor[0]},${element.borderColor[1]},${element.borderColor[2]},${element.borderColor[3]})`
        }} />
    )
}