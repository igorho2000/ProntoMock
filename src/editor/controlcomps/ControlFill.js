import React from 'react';
import '../editor.css';
import { useSelector, useDispatch } from 'react-redux';

import {
    ChangeSelectedProperties,
    SaveDraft,
    selectDraft,
} from '../../features/draftSlice';

import ControlColorpicker from './ControlColorpicker';
import { RGBtoHEX } from '../../Functions';

export default function ControlFill() {

    const draftSettings = useSelector(selectDraft);
    const canvasSettings = draftSettings.selectedObject[0];

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        fillColor: RGBtoHEX(canvasSettings.fillColor),
    })

    React.useEffect(() => {
        setInputValue((state) => ({
            ...state,
            fillColor: RGBtoHEX(canvasSettings.fillColor)
        }))
    }, [canvasSettings])

    function handleChange(event) {
        setInputValue((state) => (
            {...state,
            [event.target.id]: event.target.value}
        ))
    }
    function handleHEXBlur(event) {
        
        if (event.target.value[0] !== '#' && event.target.value.length !== 6) {
            setInputValue((state) => (
                {...state,
                [event.target.id]: RGBtoHEX(canvasSettings.fillColor)}
            ))
            return
        }
        if (event.target.value[0] === '#' && event.target.value.length !== 7) {
            setInputValue((state) => (
                {...state,
                [event.target.id]: RGBtoHEX(canvasSettings.fillColor)}
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
        dispatch(SaveDraft());
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
                <h4 className='control-group-title'>Fill</h4>
            </div>
            <div className='control-group'>
                <form className='control-form-color' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onBlur={handleHEXBlur}>
                    <label>Color</label>
                    <input id="fillColor" type="text" value={inputValue.fillColor} onChange={handleChange} />
                    <div onClick={toggleColorPop} style={{background: `linear-gradient(to right, 
                        rgba(${canvasSettings.fillColor[0]}, ${canvasSettings.fillColor[1]}, ${canvasSettings.fillColor[2]}, ${canvasSettings.fillColor[3]}), 
                        rgba(${canvasSettings.fillColor[0]}, ${canvasSettings.fillColor[1]}, ${canvasSettings.fillColor[2]}, ${canvasSettings.fillColor[3]})), 
                        url(../../properties/transparent.svg)`}}></div>
                </form>
                {colorPop && <ControlColorpicker target='fillColor' type='selectedObject' />}
            </div>
        </div>
    )
}