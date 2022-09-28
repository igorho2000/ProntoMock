import React from 'react';
import '../editor.css';
import { useSelector, useDispatch } from 'react-redux';

import {
    ChangeSelectedProperties,
    selectDraft,
} from '../../features/draftSlice';

export default function ControlDimensions() {

    const draftSettings = useSelector(selectDraft);
    const canvasSettings = draftSettings.selectedObject[0];

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        width: canvasSettings.width,
        height: canvasSettings.height,
        x: canvasSettings.x,
        y: canvasSettings.y,
        rotate: canvasSettings.rotate,
        radius: canvasSettings.radius,
        differentRadius: canvasSettings.differentRadius,
    })

    function handleChange(event) {
        setInputValue((state) => (
            {...state,
            [event.target.id]: event.target.value}
        ))
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
        dispatch(ChangeSelectedProperties([event.target.id, inputValue[event.target.id]]));
        dispatch(ChangeSelectedProperties([event.target.ariaLabel, inputValue[event.target.ariaLabel]]));
    }

    function handleBlur(event) {
        if (event.target.value === '') {
            setInputValue((state) => (
                {...state,
                [event.target.id]: canvasSettings[event.target.id]}
            ))
            return
        }
        dispatch(ChangeSelectedProperties([event.target.id, inputValue[event.target.id]]));
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

    return (
        <div className='control-title'>
                <div>
                    <h4 className='control-group-title'>Dimensions</h4>
                </div>
                <div className='control-group'>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onBlur={handleBlur}>
                        <label>Width</label>
                        <input id='width' type='number' value={inputValue.width} onChange={handleChange}/>
                    </form>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onBlur={handleBlur}>
                        <label>Height</label>
                        <input id='height' type='number' value={inputValue.height} onChange={handleChange}/>
                    </form>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onBlur={handleBlur}>
                        <label>X</label>
                        <input id='x' type='number' value={inputValue.x} onChange={handleChange}/>
                    </form>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onBlur={handleBlur}>
                        <label>Y</label>
                        <input id='y' type='number' value={inputValue.y} onChange={handleChange}/>
                    </form>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onBlur={handleBlur}>
                        <label>Rotate</label>
                        <input id='rotate' type='number' value={inputValue.rotate} onChange={handleChange} />
                    </form>
                    {
                        inputValue.differentRadius ?
                        <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                            <label>Radius</label>
                            <div className='control-form-input'>
                                <input id="radius" aria-label={0} onChange={handleCheckInputChange} onBlur={handleBlur} style={{borderRight: "none", borderBottom: "none", borderWidth: '2px'}} type='number' value={inputValue.radius[0]} />
                                <input id="radius" aria-label={1} onChange={handleCheckInputChange} onBlur={handleBlur} style={{borderLeft: "none", borderBottom: "none", borderWidth: '2px'}} type='number' value={inputValue.radius[1]} />
                                <input id="radius" aria-label={2} onChange={handleCheckInputChange} onBlur={handleBlur} style={{borderLeft: "none", borderTop: "none", borderWidth: '2px'}} type='number' value={inputValue.radius[2]} />
                                <input id="radius" aria-label={3} onChange={handleCheckInputChange} onBlur={handleBlur} style={{borderRight: "none", borderTop: "none", borderWidth: '2px'}} type='number' value={inputValue.radius[3]} />
                            </div>
                        </form>
                        :
                        <form className='control-form' onSubmit={handleSubmit} onBlur={handleBlur} onKeyUp={handleKeyUp}>
                            <label>Radius</label>
                            <input type="number" id="radius" aria-label={4} onChange={handleCheckInputChange} value={inputValue.radius[0]} />
                        </form>
                    }
                    
                    <div className='control-form-check'>
                        <input type="checkbox" aria-label='radius' id="differentRadius" checked={inputValue.differentRadius} onChange={handleCheckChange} />
                        <label for="differentRadius">Different radius on each corner</label>
                    </div>
                    
                </div>
            </div>
    )
}