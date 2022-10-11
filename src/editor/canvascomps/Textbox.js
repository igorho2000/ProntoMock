import React from 'react';

import { selectDraft, SelectObject, ChangeSelectedText, SaveDraft } from '../../features/draftSlice';

import { useSelector, useDispatch } from 'react-redux';

export default function Textbox(props) {
    const dispatch = useDispatch();
    const draftInfo = useSelector(selectDraft);

    const element = props.element;
    const zoom = draftInfo.statistics.zoom;

    const [textValue, setTextValue] = React.useState(element.value);

    function HandleChange(event) {
        setTextValue(event.target.value);
        dispatch(ChangeSelectedText([props.index, `${event.target.value}`]));
        // English Symbols
        if ([' ', ',', '.', '(', ')', '[', ']', '{', '}', '/', "'", '"', '!', '@', '?', ':', ';', '&', '%', '$', '#' ].includes(event.nativeEvent.data)) {
            dispatch(SaveDraft());
            return
            
        }
        // Chinese Symbols
        if (['，', '。', '？', '！', '｢', '」', '、', '】', '【'].includes(event.nativeEvent.data)) {
            dispatch(SaveDraft());
            return
        }
        if (event.nativeEvent.inputType === 'insertLineBreak' || event.nativeEvent.inputType === 'deleteContentBackward') {
            dispatch(SaveDraft());
        }
    }
    
    // Need to hook up textvalue to store (Maybe split up the rendering of every vs selected object)

    return (
        <textarea className={props.selected && 'selectedText'} value={props.selected ? textValue : element.value} readOnly={props.selected ? false : true} onChange={HandleChange} style={{
            padding: '0', overflow: "hidden", position: 'absolute', resize: 'none', width:`${element.width / draftInfo.canvasSettings.width * 100}%`, height:`${element.height / draftInfo.canvasSettings.height * 100}%`,
            left: `${element.x / draftInfo.canvasSettings.width * 100}%`, top: `${element.y / draftInfo.canvasSettings.height * 100}%`, transform: `rotate(${element.rotate}deg)`, borderRadius: `${element.radius[0] * zoom}mm ${element.radius[1] * zoom}mm ${element.radius[2] * zoom}mm ${element.radius[3] * zoom}mm`, zIndex: element.zIndex,
            fontWeight: element.bold ? '700' : '400', textDecorationLine: element.underline ? 'underline' : 'none', fontStyle: element.italic ? 'italic' : 'normal',
            fontFamily: element.font, textAlign: element.textAlign, fontSize: `${element.size * zoom}pt`,
            color: `rgba(${element.textColor[0]},${element.textColor[1]},${element.textColor[2]},${element.textColor[3]})`, backgroundColor: `rgba(${element.fillColor[0]},${element.fillColor[1]},${element.fillColor[2]},${element.fillColor[3]})`,
            borderStyle: element.borderStyle, borderWidth: `${element.borderWidth * zoom}mm`, borderColor: `rgba(${element.borderColor[0]},${element.borderColor[1]},${element.borderColor[2]},${element.borderColor[3]})`,
            userSelect: 'none',
        }} onClick={() => {
            if (props.selected === false) {
                dispatch(SelectObject(props.index))
            } 
            }} />
    )
}