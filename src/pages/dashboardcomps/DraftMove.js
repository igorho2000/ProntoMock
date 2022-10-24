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
        <div className="draftrename draftmove" ref={wrapperRef} >
            <form className="draftrename-form" onSubmit={handleSubmit}>
                <h4 className="draftrename-title">Move Draft</h4>
                <div className="draftmove-input">
                    <label>{`Moving "${props.name}" to...`}</label>
                    <select className="draftrename-input" value={inputValue.value} onChange={handleChange} id="projects">
                        {datalist}
                    </select>
                </div>

                <div className="draftrename-buttoncont" style={{marginTop: '5px'}}>
                    <button className="draftrename-cancel" onClick={() => dispatch(resetPopups())}>Cancel</button>
                    <input className="draftrename-submit" type="submit" value="Move" />
                </div>
            </form>
        </div>
    )
}