import React from "react";
import '../../pages/dashboardcomps/Drop.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetPopups, selectEveryPopup
} from '../../features/popupSlice';

import { selectDraft, SaveDraft, AddIcon} from "../../features/draftSlice";

import { useOutsideClick } from "../../Functions";

import { allIcons } from "../../features/AllIcons";


export default function IconAdder() {

    const popup = useSelector(selectEveryPopup);
    const draftInfo = useSelector(selectDraft);
    const selected = draftInfo.selectedObject;
    const canvasSettings = draftInfo.canvasSettings;
    const zoom = draftInfo.statistics.zoom;

    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const styleClass = {
        'Regular': 'material-icons',
        'Outlined': 'material-icons-outlined',
        'Round': 'material-icons-round',
        'Sharp': 'material-icons-sharp',
        'Two-Toned': 'material-icons-two-tone',
    }

    const [inputValue, setInputValue] = React.useState({
        search: '',
        iconStyle: 'Regular',
        iconOutputNum: 0,
        selectedIcon: '',
    })

    function handleChange(event) {
        setInputValue((state) => ({
            ...state,
            search: event.target.value
        }))
    }

    function handleSelectChange(event) {
        setInputValue((state) => ({
            ...state,
            iconStyle: event.target.value
        }))
    }

    function handleRadioChange(event) {
        setInputValue((state) => ({
            ...state,
            selectedIcon: event.target.value
        }))
    }

    var filterAllIcons = allIcons.filter((element) => (element[0].includes(inputValue.search)))

    var iconOutput = [];
    for (let i=0; i<16; i++) {
        if (filterAllIcons[i] === undefined) {
            break
        }
        iconOutput.push(
                <label htmlFor={filterAllIcons[i][0]} className={styleClass[inputValue.iconStyle]} 
                style={{border: inputValue.selectedIcon === filterAllIcons[i][0] ? '#22b1e0 solid 2px' : 'transparent solid 2px', borderRadius: '10px', cursor: 'pointer', fontSize: '2.2rem'}} 
                key={`icondisplay_${filterAllIcons[i][0]}`}>{filterAllIcons[i][0]}
                    <input style={{display: 'none'}} type='radio' id={filterAllIcons[i][0]} name='iconlist' value={filterAllIcons[i][0]} checked={inputValue.selectedIcon === filterAllIcons[i][0]} onChange={handleRadioChange} />
                </label>
        )
    }
    
    return (
        <div className="elements" ref={wrapperRef} style={{position: 'fixed', left: '85px', top: '425px', borderRadius: '15px', padding: '7px 5px'}}>
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="iconadder-cont" >
                    <input className='iconadder-search' type='text' value={inputValue.search} onChange={handleChange} placeholder='Search for Icon...' />
                    <div>
                        <label style={{fontSize: '0.8rem'}} >Icon Style:</label>
                        <select value={inputValue.iconStyle} onChange={handleSelectChange} >
                            <option>Regular</option>
                            <option>Outlined</option>
                            <option>Round</option>
                            <option>Sharp</option>
                            <option>Two-Toned</option>
                        </select>
                    </div>
                    {
                        filterAllIcons.length === 0
                        ?
                        <label>No Icons Found</label> :
                        <div>
                            {iconOutput}
                        </div>
                    }
                    {
                    inputValue.selectedIcon !== ''
                    &&
                    <div style={{display: inputValue.imageURL === null ? 'none' : 'block'}} >
                        <button onClick={() => {
                            dispatch(AddIcon([inputValue.selectedIcon, styleClass[inputValue.iconStyle]]));
                            dispatch(SaveDraft())
                        }}>Add Icon</button>
                        <button onClick={() => dispatch(resetPopups())}>Cancel</button>
                    </div>
                    }
                </div>
            </form>
        </div>
    )
}