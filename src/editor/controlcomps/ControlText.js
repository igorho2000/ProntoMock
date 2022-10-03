import React from 'react';
import '../editor.css';
import { useSelector, useDispatch } from 'react-redux';

import {
    ChangeSelectedProperties,
    selectDraft,
} from '../../features/draftSlice';

import ControlColorpicker from './ControlColorpicker';
import { RGBtoHEX } from '../../Functions';

export default function ControlText() {

    const draftSettings = useSelector(selectDraft);
    const canvasSettings = draftSettings.selectedObject[0];

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        bold: canvasSettings.bold,
        underline: canvasSettings.underline,
        italic: canvasSettings.italic,
        textAlign: canvasSettings.textAlign,
        font: canvasSettings.font,
        textColor: RGBtoHEX(canvasSettings.textColor),
        size: canvasSettings.size
    })

    React.useEffect(() => {
        setInputValue((state) => ({
            ...state,
            textColor: RGBtoHEX(canvasSettings.textColor)
        }))
    }, [canvasSettings])

    function handleChange(event) {
        setInputValue((state) => (
            {...state,
            [event.target.id]: event.target.value}
        ))
    }
    function handleSelectChange(event) {
        setInputValue((state) => (
            {...state,
            [event.target.id]: event.target.value}
        ))
        dispatch(ChangeSelectedProperties([event.target.id, event.target.value]))
    }

    function handleBlur(event) {
        if (event.target.value === '' || +event.target.value <= 0 ) {
            setInputValue((state) => (
                {...state,
                [event.target.id]: canvasSettings[event.target.id]}
            ))
            return
        }
        dispatch(ChangeSelectedProperties([event.target.id, inputValue[event.target.id]]));
    }
    function handleHEXBlur(event) {
        
        if (event.target.value[0] !== '#' && event.target.value.length !== 6) {
            setInputValue((state) => (
                {...state,
                [event.target.id]: RGBtoHEX(canvasSettings.textColor)}
            ))
            return
        }
        if (event.target.value[0] === '#' && event.target.value.length !== 7) {
            setInputValue((state) => (
                {...state,
                [event.target.id]: RGBtoHEX(canvasSettings.textColor)}
            ))
            return
        }
        var toConvert = event.target.value;
        if (toConvert[0] === '#') {
            toConvert = toConvert.substring(1);
        }
        if (/^[a-fA-F0-9]+$/.test(toConvert) === false) {
            return
        }
        const red = parseInt(toConvert.substring(0,2), 16);
        const green = parseInt(toConvert.substring(2,4), 16);
        const blue = parseInt(toConvert.substring(4,6), 16);

        var output = [...canvasSettings[event.target.id]];
        output[0] = red;
        output[1] = green;
        output[2] = blue;
        dispatch(ChangeSelectedProperties([event.target.id, output]))
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    function handleKeyUp(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    }
    function toggleStyle(event) {
        setInputValue((state) => ({
            ...state,
            [event.target.id]: state[event.target.id] ? false : true
        }))
        dispatch(ChangeSelectedProperties([event.target.id, inputValue[event.target.id] ? false : true]))
    }
    function toggleAlign(event) {
        setInputValue((state) => ({
            ...state,
            [event.target.id]: event.target.ariaLabel
        }))
        dispatch(ChangeSelectedProperties([event.target.id, event.target.ariaLabel]))
    }

    const [colorPop, setColorPop] = React.useState(false);
    function toggleColorPop() {
        setColorPop((state) => (
            state ? false : true
        ))
    }

    return (
        <div className='control-title'>
            <div>
                <h4 className='control-group-title'>Text</h4>
            </div>
            <div className='control-group'>
                
                <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onBlur={handleBlur}>
                    <label>Size</label>
                    <input id="size" type="number" value={inputValue.size} onChange={handleChange} />
                </form>
                <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                    <label>Style</label>
                    <img id="bold" onClick={toggleStyle} style={{marginLeft:"5px", height: "1.2rem", marginTop: 0, border: inputValue.bold ? 'gray 1px solid' : 'none', padding: inputValue.bold ? '1px' : '2px'}} src="../properties/bold.svg" />
                    <img id="underline" onClick={toggleStyle} style={{height: "1.2rem", marginTop: 0, border: inputValue.underline ? 'gray 1px solid' : 'none', padding: inputValue.underline ? '1px' : '2px'}} src="../properties/underlined.svg" />
                    <img id="italic" onClick={toggleStyle} style={{height: "1.2rem", marginTop: 0, border: inputValue.italic ? 'gray 1px solid' : 'none', padding: inputValue.italic ? '1px' : '2px'}} src="../properties/italic.svg" />
                </form>
                <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                    <label>Align</label>
                    <img id='textAlign' aria-label='left' onClick={toggleAlign} style={{marginLeft:"5px", height: "1.2rem", marginTop: 0, border: inputValue.textAlign === 'left' ? 'gray 1px solid' : 'none', padding: inputValue.textAlign === 'left' ? '1px' : '2px'}} src="../properties/format_align_left.svg" />
                    <img id='textAlign' aria-label='center' onClick={toggleAlign} style={{height: "1.2rem", marginTop: 0, border: inputValue.textAlign === 'center' ? 'gray 1px solid' : 'none', padding: inputValue.textAlign === 'center' ? '1px' : '2px'}} src="../properties/format_align_center.svg" />
                    <img id='textAlign' aria-label='right' onClick={toggleAlign} style={{height: "1.2rem", marginTop: 0, border: inputValue.textAlign === 'right' ? 'gray 1px solid' : 'none', padding: inputValue.textAlign === 'right' ? '1px' : '2px'}} src="../properties/format_align_right.svg" />
                    <img id='textAlign' aria-label='justify' onClick={toggleAlign} style={{height: "1.2rem", marginTop: 0, border: inputValue.textAlign === 'justify' ? 'gray 1px solid' : 'none', padding: inputValue.textAlign === 'justify' ? '1px' : '2px'}} src="../properties/format_align_justify.svg" />
                </form>
                <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                    <label>Font</label>
                    <select id='font' value={inputValue.font} onChange={handleSelectChange} style={{width: '10rem'}}>
                        <option>Ariel</option>
                        <option>Verdana</option>
                        <option>Tahoma</option>
                        <option>Trebuchet MS</option>
                        <option>Times New Roman</option>
                        <option>Georgia</option>
                        <option>Garamond</option>
                        <option>Courier New</option>
                        <option>Brush Script MT</option>
                    </select>
                </form>
                <form className='control-form-color' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onBlur={handleHEXBlur}>
                    <label>Color</label>
                    <input id="textColor" type="text" value={inputValue.textColor} onChange={handleChange} />
                    <div onClick={toggleColorPop} style={{background: `linear-gradient(to right, 
                        rgba(${canvasSettings.textColor[0]}, ${canvasSettings.textColor[1]}, ${canvasSettings.textColor[2]}, ${canvasSettings.textColor[3]}), 
                        rgba(${canvasSettings.textColor[0]}, ${canvasSettings.textColor[1]}, ${canvasSettings.textColor[2]}, ${canvasSettings.textColor[3]})), 
                        url(../../properties/transparent.svg)`}}></div>
                </form>
                {colorPop && <ControlColorpicker target='textColor' type='selectedObject' />}
            </div>
        </div>
    )
}