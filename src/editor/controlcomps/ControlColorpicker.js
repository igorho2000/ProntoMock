import React from 'react';
import '../editor.css';
import { useSelector, useDispatch } from 'react-redux';

import {
    ChangeCanvasProperties,
    selectDraft,
} from '../../features/draftSlice';

export default function ControlColorpicker(props) {

    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);

    const draftSettings = useSelector(selectDraft);
    const canvasSettings = draftSettings.canvasSettings;

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        red: canvasSettings.fillColor[0],
        green: canvasSettings.fillColor[1],
        blue: canvasSettings.fillColor[2],
        opacity: canvasSettings.fillColor[3],
    })

    

    function useOutsideClick(ref) {
        React.useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              props.toggle();
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }
    function handleChange(event) {
        setInputValue((state) => (
            {...state,
            [event.target.id]: event.target.value}
        ))
        const output = [...canvasSettings.fillColor]
        output[event.target.ariaLabel] = +event.target.value;
        dispatch(ChangeCanvasProperties([props.target, output]));
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
        <div className='control-form-slider-cont' ref={wrapperRef}>
            <form class="control-form-slider" onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <label>Red</label>
                <input type="range" id='red' aria-label={0} min="0" max="255" value={inputValue.red} className="control-form-slider-slider" onChange={handleChange}
                style={{background: `linear-gradient(to right, rgba(0, ${inputValue.green}, ${inputValue.blue}, ${inputValue.opacity}), rgba(255, ${inputValue.green}, ${inputValue.blue}, ${inputValue.opacity})), url(../../properties/transparent.svg)`}} ></input>
                <input id='red' aria-label={0} className="control-form-slider-input" type="text" value={inputValue.red} onChange={handleChange}/>
            </form>
            <form class="control-form-slider" onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <label>Green</label>
                <input id='green' aria-label={1} type="range" min="0" max="255" value={inputValue.green} className="control-form-slider-slider" onChange={handleChange}
                style={{background: `linear-gradient(to right, rgba(${inputValue.red}, 0, ${inputValue.blue}, ${inputValue.opacity}), rgba(${inputValue.red}, 255, ${inputValue.blue}, ${inputValue.opacity})), url(../../properties/transparent.svg)`}}></input>
                <input id='green' aria-label={1} className="control-form-slider-input" type="text" value={inputValue.green} onChange={handleChange} />
            </form>
            <form class="control-form-slider" onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <label>Blue</label>
                <input id='blue' aria-label={2} type="range" min="0" max="255" value={inputValue.blue} className="control-form-slider-slider" onChange={handleChange}
                style={{background: `linear-gradient(to right, rgba(${inputValue.red}, ${inputValue.green}, 0, ${inputValue.opacity}), rgba(${inputValue.red}, ${inputValue.green}, 255, ${inputValue.opacity})), url(../../properties/transparent.svg)`}}></input>
                <input id='blue' aria-label={2} className="control-form-slider-input" type="text" value={inputValue.blue} onChange={handleChange} />
            </form>
            <form class="control-form-slider" onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <label>Opacity</label>
                <input id='opacity' aria-label={3} type="range" min="0" max="1" step="0.01" value={inputValue.opacity} className="control-form-slider-slider" onChange={handleChange}
                style={{background: `linear-gradient(to right, rgba(${inputValue.red}, ${inputValue.green}, ${inputValue.blue}, 0), rgba(${inputValue.red}, ${inputValue.green}, ${inputValue.blue}, 255)), url(../../properties/transparent.svg)`}}></input>
                <input id='opacity' aria-label={3} className="control-form-slider-input" type="text" value={inputValue.opacity} onChange={handleChange} />
            </form>
            <div className='control-form-color-pick'>
                <div style={{backgroundColor: "rgba(255,0,0,1)"}}></div>
                <div style={{backgroundColor: "rgba(255,128,0,1)"}}></div>
                <div style={{backgroundColor: "rgba(255,255,0,1)"}}></div>
                <div style={{backgroundColor: "rgba(0,220,0,1)"}}></div>
                <div style={{backgroundColor: "rgba(128,255,0,1)"}}></div>
                <div style={{backgroundColor: "rgba(0,255,128,1)"}}></div>
                <div style={{backgroundColor: "rgba(0,255,255,1)"}}></div>
                <div style={{backgroundColor: "rgba(0,128,255,1)"}}></div>
                <div style={{backgroundColor: "rgba(0,0,255,1)"}}></div>
                <div style={{backgroundColor: "rgba(127,0,255,1)"}}></div>
                <div style={{backgroundColor: "rgba(255,0,255,1)"}}></div>
                <div style={{backgroundColor: "rgba(255,0,127,1)"}}></div>
            </div>
            <div className='control-form-color-pick'>
                <div style={{backgroundColor: "rgba(153,37,11,1)"}}></div>
                <div style={{backgroundColor: "rgba(245,123,102,1)"}}></div>
                <div style={{backgroundColor: "rgba(0,114,152,1)"}}></div>
                <div style={{backgroundColor: "rgba(0,78,104,1)"}}></div>
                <div style={{backgroundColor: "rgba(0,0,0,1)"}}></div>
                <div style={{backgroundColor: "rgba(36,36,36,1)"}}></div>
                <div style={{backgroundColor: "rgba(73,73,73,1)"}}></div>
                <div style={{backgroundColor: "rgba(109,109,109,1)"}}></div>
                <div style={{backgroundColor: "rgba(146,146,146,1)"}}></div>
                <div style={{backgroundColor: "rgba(192,192,192,1)"}}></div>
                <div style={{backgroundColor: "rgba(228,228,228,1)"}}></div>
                <div style={{backgroundColor: "rgba(255,255,255,1)"}}></div>
            </div>
        </div>
    )
}