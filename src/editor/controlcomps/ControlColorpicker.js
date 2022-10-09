import React from 'react';
import '../editor.css';
import { useSelector, useDispatch } from 'react-redux';

import {
    ChangeCanvasProperties, ChangeSelectedProperties,
    SaveDraft,
    selectDraft,
} from '../../features/draftSlice';

export default function ControlColorpicker(props) {

    const draftSettings = useSelector(selectDraft);
    var colorSettings = '';

    if (props.type === 'selectedObject') {
        colorSettings = draftSettings[props.type][0];
    } else if (props.type == 'canvasSettings') {
        colorSettings = draftSettings[props.type];
    }

    const dispatch = useDispatch();

    const defaultOne = [[255,0,0],[255,128,0],[255,255,0],[0,220,0],[128,255,0],
    [0,255,128],[0,255,255],[0,128,255],[0,0,255],[127,0,255],[255,0,255],[255,0,127],];
    const defaultTwo = [[153,37,11],[245,123,102],[0,114,152],[0,78,104],[0,0,0],
    [36,36,36],[73,73,73],[109,109,109],[146,146,146],[192,192,192],[228,228,228],[255,255,255],];

    function toDefaultColor(item) {
        return (
            <div style={{backgroundColor: `rgba(${item[0]},${item[1]},${item[2]},1)`}}
            onClick={() => {defaultColor(item)}} key={`defaultcolor(${item[0]},${item[1]},${item[2]})`}></div>
        )
    }

    const outputDefaultOne = defaultOne.map(toDefaultColor);
    const outputDefaultTwo = defaultTwo.map(toDefaultColor);


    const [inputValue, setInputValue] = React.useState({
        red: colorSettings[props.target][0],
        green: colorSettings[props.target][1],
        blue: colorSettings[props.target][2],
        opacity: colorSettings[props.target][3],
    })

    React.useEffect(() =>
        {
            setInputValue({
                red: colorSettings[props.target][0],
                green: colorSettings[props.target][1],
                blue: colorSettings[props.target][2],
                opacity: colorSettings[props.target][3],
            })
        }, [colorSettings]
    )

    function handleChange(event) {
        var input = 0;
        var toStore = 0;
        var upperbound = 255;
        if (event.target.ariaLabel == 3) {
            upperbound = 1;
        }

        if (event.target.value === '') {
            input = '';
            toStore = 0;
        } else if (+event.target.value < 0) {
            input = 0;
            toStore = 0;
        } else if (+event.target.value > upperbound) {
            input = upperbound;
            toStore = upperbound;
        } else {
            input = +event.target.value;
            toStore = +event.target.value;
        }

        setInputValue((state) => (
            {...state,
            [event.target.id]: input}
        ))
        const output = [...colorSettings[props.target]]
        output[event.target.ariaLabel] = toStore;
        if (props.type === 'canvasSettings') {
            dispatch(ChangeCanvasProperties([props.target, output]));
            return
        }
        dispatch(ChangeSelectedProperties([props.target, output]));
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
    function defaultColor(array) {
        setInputValue({
            red: array[0],
            green: array[1],
            blue: array[2],
            opacity: 1
        })

        array.push(1);
        if (props.type === 'canvasSettings') {
            dispatch(ChangeCanvasProperties([props.target, array]));
            return
        }
        dispatch(ChangeSelectedProperties([props.target, array]));
    }


    return (
        <div className='control-form-slider-cont'>
            <form className="control-form-slider" onSubmit={handleSubmit} onKeyUp={handleKeyUp} >
                <label>Red</label>
                <input type="range" id='red' aria-label={0} min="0" max="255" value={inputValue.red} className="control-form-slider-slider" onChange={handleChange} 
                style={{background: `linear-gradient(to right, rgba(0, ${inputValue.green}, ${inputValue.blue}, ${inputValue.opacity}), rgba(255, ${inputValue.green}, ${inputValue.blue}, ${inputValue.opacity})), url(../../properties/transparent.svg)`}} ></input>
                <input id='red' aria-label={0} className="control-form-slider-input" type='number' value={inputValue.red} onChange={handleChange}/>
            </form>
            <form className="control-form-slider" onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <label>Green</label>
                <input id='green' aria-label={1} type="range" min="0" max="255" value={inputValue.green} className="control-form-slider-slider" onChange={handleChange}
                style={{background: `linear-gradient(to right, rgba(${inputValue.red}, 0, ${inputValue.blue}, ${inputValue.opacity}), rgba(${inputValue.red}, 255, ${inputValue.blue}, ${inputValue.opacity})), url(../../properties/transparent.svg)`}}></input>
                <input id='green' aria-label={1} className="control-form-slider-input" type='number' value={inputValue.green} onChange={handleChange} />
            </form>
            <form className="control-form-slider" onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <label>Blue</label>
                <input id='blue' aria-label={2} type="range" min="0" max="255" value={inputValue.blue} className="control-form-slider-slider" onChange={handleChange}
                style={{background: `linear-gradient(to right, rgba(${inputValue.red}, ${inputValue.green}, 0, ${inputValue.opacity}), rgba(${inputValue.red}, ${inputValue.green}, 255, ${inputValue.opacity})), url(../../properties/transparent.svg)`}}></input>
                <input id='blue' aria-label={2} className="control-form-slider-input" type='number' value={inputValue.blue} onChange={handleChange} />
            </form>
            <form className="control-form-slider" onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <label>Opacity</label>
                <input id='opacity' aria-label={3} type="range" min="0" max="1" step="0.01" value={inputValue.opacity} className="control-form-slider-slider" onChange={handleChange}
                style={{background: `linear-gradient(to right, rgba(${inputValue.red}, ${inputValue.green}, ${inputValue.blue}, 0), rgba(${inputValue.red}, ${inputValue.green}, ${inputValue.blue}, 255)), url(../../properties/transparent.svg)`}}></input>
                <input id='opacity' aria-label={3} className="control-form-slider-input" type='number' value={inputValue.opacity} onChange={handleChange} />
            </form>
            <div className='control-form-color-pick'>
                {outputDefaultOne}
            </div>
            <div className='control-form-color-pick'>
                {outputDefaultTwo}
            </div>
        </div>
    )
}