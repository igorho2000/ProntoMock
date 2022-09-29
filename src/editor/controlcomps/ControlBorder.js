import React from 'react';
import '../editor.css';
import { useSelector, useDispatch } from 'react-redux';

import {
    ChangeSelectedProperties,
    selectDraft,
} from '../../features/draftSlice';

import ControlColorpicker from './ControlColorpicker';
import { RGBtoHEX } from '../../Functions';

export default function ControlBorder() {

    const draftSettings = useSelector(selectDraft);
    const canvasSettings = draftSettings.selectedObject[0];

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        borderStyle: canvasSettings.borderStyle,
        borderWidth: canvasSettings.borderWidth,
        borderColor: RGBtoHEX(canvasSettings.borderColor)
    })

    React.useEffect(() => {
        setInputValue((state) => ({
            ...state,
            borderColor: RGBtoHEX(canvasSettings.borderColor)
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
        dispatch(ChangeSelectedProperties([event.target.id, inputValue[event.target.id]]))
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
                [event.target.id]: RGBtoHEX(canvasSettings.borderColor)}
            ))
            return
        }
        if (event.target.value[0] === '#' && event.target.value.length !== 7) {
            setInputValue((state) => (
                {...state,
                [event.target.id]: RGBtoHEX(canvasSettings.borderColor)}
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

    const [colorPop, setColorPop] = React.useState(false);
    function toggleColorPop() {
        setColorPop((state) => (
            state ? false : true
        ))
    }

    return (
        <div className='control-title'>
            <div>
                <h4 className='control-group-title'>Border</h4>
            </div>
            <div className='control-group'>
                <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                    <label>Style</label>
                    <select id='borderStyle' value={inputValue.borderStyle} onChange={handleSelectChange} >
                        <option>none</option>
                        <option>solid</option>
                        <option>dashed</option>
                        <option>dotted</option>
                    </select>
                </form>
                <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onBlur={handleBlur}>
                    <label>Width</label>
                    <input id="borderWidth" type="number" value={inputValue.borderWidth} onChange={handleChange} />
                </form>
                <form className='control-form-color' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onBlur={handleHEXBlur}>
                    <label>text</label>
                    <input id="borderColor" type="text" value={inputValue.borderColor} onChange={handleChange} />
                    <div onClick={toggleColorPop} style={{background: `linear-gradient(to right, 
                        rgba(${canvasSettings.borderColor[0]}, ${canvasSettings.borderColor[1]}, ${canvasSettings.borderColor[2]}, ${canvasSettings.borderColor[3]}), 
                        rgba(${canvasSettings.borderColor[0]}, ${canvasSettings.borderColor[1]}, ${canvasSettings.borderColor[2]}, ${canvasSettings.borderColor[3]})), 
                        url(../../properties/transparent.svg)`}}></div>
                </form>
                {colorPop && <ControlColorpicker target='borderColor' type='selectedObject' />}
            </div>
        </div>
    )
}