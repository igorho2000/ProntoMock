import React from 'react';
import '../editor.css';
import { useSelector, useDispatch } from 'react-redux';

import {
    ChangeCanvasProperties,
    selectDraft,
} from '../../features/draftSlice';

import ControlColorpicker from './ControlColorpicker';

export default function ControlDocument() {

    const draftSettings = useSelector(selectDraft);
    const canvasSettings = draftSettings.canvasSettings;

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        size: canvasSettings.size,
        unit: canvasSettings.unit,
        width: canvasSettings.width,
        height: canvasSettings.height,
        margin: canvasSettings.margin,
        differentMargin: canvasSettings.differentMargin,
        fillColor: canvasSettings.fillColor
    })

    // handleBlur();
    // handleChange();
    // handleCheckChange();
    // handleCheckInputChange();
    // handleKeyUp();
    // handleSelectChange();
    // handleSubmit();

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
        dispatch(ChangeCanvasProperties([event.target.id, inputValue[event.target.id]]))
    }
    function handleCheckInputChange(event) {
        if (event.target.ariaLabel === '4') {
            setInputValue((state) => (
                {...state,
                [event.target.id]: [event.target.value, event.target.value, event.target.value, event.target.value]}
            ))
            return
        }
        setInputValue((state) => {
            var newArray = [...state[event.target.id]];
            newArray[event.target.ariaLabel] = event.target.value;
            return ({
                ...state,
                [event.target.id]: newArray
            })
        })
    }
    function handleCheckChange(event) {
        setInputValue((state) => (
            {...state,
            [event.target.id]: event.target.checked,
            [event.target.ariaLabel]: [state[event.target.ariaLabel][0], state[event.target.ariaLabel][0], state[event.target.ariaLabel][0], state[event.target.ariaLabel][0]]
        }
        ))
        dispatch(ChangeCanvasProperties([event.target.id, inputValue[event.target.id]]));
        dispatch(ChangeCanvasProperties(['margin', inputValue.margin]));
    }
    function handleBlur(event) {
        if (event.target.value === '') {
            setInputValue((state) => (
                {...state,
                [event.target.id]: canvasSettings[event.target.id]}
            ))
            return
        }
        dispatch(ChangeCanvasProperties([event.target.id, inputValue[event.target.id]]));
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
            <h4 className='control-group-title'>Document</h4>
        </div>
        <div className='control-group'>
            <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <label>Size</label>
                <select value={inputValue.size} id="size" onChange={handleSelectChange}>
                    <option>A4</option>
                    <option>A3</option>
                    <option>Custom</option>
                </select>
            </form>
            <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <label>Unit</label>
                <select value={inputValue.unit} id="unit" onChange={handleSelectChange}>
                    <option>in</option>
                    <option>mm</option>
                    <option>cm</option>
                    <option>pt</option>
                    <option>px</option>
                </select>
            </form>
            <form className='control-form' onSubmit={handleSubmit} onBlur={handleBlur} onKeyUp={handleKeyUp}>
                <label>Width</label>
                <input type="number" value={inputValue.width} id="width" onChange={handleChange} />
            </form>
            
            <form className='control-form' onSubmit={handleSubmit} onBlur={handleBlur} onKeyUp={handleKeyUp}>
                <label>Height</label>
                <input type="number" value={inputValue.height} id="height" onChange={handleCheckChange} />
            </form>
            {
                inputValue.differentMargin ?
                <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                    <label>Margin</label>
                    <input type="number" id="margin" aria-label={0} onChange={handleCheckInputChange} onBlur={handleBlur} value={inputValue.margin[0]} style={{borderRight: "none", borderBottom: "none", borderLeft: "none", borderWidth: '2px'}} />
                    <input type="number" id="margin" aria-label={1} onChange={handleCheckInputChange} onBlur={handleBlur} value={inputValue.margin[1]} style={{borderLeft: "none", borderBottom: "none", borderTop: "none", borderWidth: '2px'}} />
                    <input type="number" id="margin" aria-label={2} onChange={handleCheckInputChange} onBlur={handleBlur} value={inputValue.margin[2]} style={{borderLeft: "none", borderTop: "none", borderRight: "none", borderWidth: '2px'}} />
                    <input type="number" id="margin" aria-label={3} onChange={handleCheckInputChange} onBlur={handleBlur} value={inputValue.margin[3]} style={{borderRight: "none", borderTop: "none", borderBottom: "none", borderWidth: '2px'}} />
            
                </form>
                :
                <form className='control-form' onSubmit={handleSubmit} onBlur={handleBlur} onKeyUp={handleKeyUp}>
                    <label>Margin</label>
                    <input type="number" id="margin" aria-label={4} onChange={handleCheckInputChange} value={inputValue.margin[0]} />
                </form>
            }
            
            <div className='control-form-check'>
                <input type="checkbox" aria-label='margin' id="differentMargin" checked={inputValue.differentMargin} onChange={handleCheckChange} />
                <label for="differentMargin">Different margin on each side</label>
            </div>
            <form className='control-form-color' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <label>Fill</label>
                <input type="text" value="#00FF00" />
                <div onClick={toggleColorPop} style={{background: `linear-gradient(to right, 
                    rgba(${canvasSettings.fillColor[0]}, ${canvasSettings.fillColor[1]}, ${canvasSettings.fillColor[2]}, ${canvasSettings.fillColor[3]}), 
                    rgba(${canvasSettings.fillColor[0]}, ${canvasSettings.fillColor[1]}, ${canvasSettings.fillColor[2]}, ${canvasSettings.fillColor[3]})), 
                    url(../../properties/transparent.svg)`}}></div>
            </form>
            {colorPop && <ControlColorpicker toggle={toggleColorPop} target='fillColor' />}
            
        </div>
        
    </div>
    
    )
}