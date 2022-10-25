import React from "react";
import './Drop.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    switchProject, moveProjectDraft,
    selectEveryProject,
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";

export default function DraftMove(props) {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const everyProject = useSelector(selectEveryProject);
    const datalist = everyProject.map((item, index) => (
        <option value={item.name} key={`option${index}`}>
            {item.name}
        </option>
    ))

    const [inputValue, setInputValue] = React.useState({
        value: '',
        index: 0,
    });

    function handleChange(event) {
        setInputValue((state) => ({
            value: event.target.value,
            index: event.target.selectedIndex
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(moveProjectDraft([props.index, props.star, inputValue.index]));
        dispatch(resetPopups());
        dispatch(switchProject(inputValue.index));
    }

    return (
        <div className="popupform-positioner">
            <div className="popupform" ref={wrapperRef} >
                <h4 className="popupform-title">Move Draft</h4>
                <form className="popupform-form" onSubmit={handleSubmit}>
                    <div className="popupform-input">
                        <label>Move to</label>
                        <select value={inputValue.value} onChange={handleChange} id="projects">
                            {datalist}
                        </select>
                    </div>
                    <div className="popupform-buttoncont" style={{marginTop: '5px'}}>
                        <button className="popupform-button" onClick={() => dispatch(resetPopups())}>Cancel</button>
                        <input className="popupform-button popupform-button-blue popupform-button-right" type="submit" value="Move" />
                    </div>
                </form>
            </div>
        </div>
        
    )
}