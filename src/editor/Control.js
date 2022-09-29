import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import { selectDraft } from '../features/draftSlice';

import ControlDocument from './controlcomps/ControlDocument';
import ControlDimensions from './controlcomps/ControlDimensions';
import ControlAlign from './controlcomps/ControlAlign';
import ControlText from './controlcomps/ControlText';
import ControlFill from './controlcomps/ControlFill';
import ControlBorder from './controlcomps/ControlBorder';

export default function Control() {
    const draft = useSelector(selectDraft);
    const selectedType = draft.statistics.selected;

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
        <div className='control'>
            <div className='control-title'>
                <h2>Properties</h2>
                <h3 style={{fontWeight: "400"}}>{selectedType === 'none' ? "Draft Settings" : `${selectedType} Settings`}</h3>
            </div>
            <hr className='control-divider'/>
            {['none'].includes(selectedType) && 
            <div>
                <ControlDocument />
                <hr className='control-divider'/>
            </div>
            }
            {['Square', 'Text', 'Texts', 'Squares'].includes(selectedType) && 
            <div>
                <ControlDimensions radius={true} line={false}/>
                <hr className='control-divider'/>
            </div>}
            {['Ellipse', 'Ellipses'].includes(selectedType) &&
            <div>
                <ControlDimensions radius={false} line={false}/>
                <hr className='control-divider'/>
            </div>}
            {['Line', 'Lines', 'Selected'].includes(selectedType) &&
            <div>
                <ControlDimensions radius={false} line={true}/>
                <hr className='control-divider'/>
            </div>}
            {['Line', 'Text', 'Ellipse', 'Square'].includes(selectedType) &&
            <div>
                <ControlAlign selection={false} />
                <hr className='control-divider'/>
            </div>}
            {['Lines', 'Texts', 'Ellipses', 'Squares', 'Selected'].includes(selectedType) &&
            <div>
                <ControlAlign selection={true} />
                <hr className='control-divider'/>
            </div>}
            {['Text', 'Texts'].includes(selectedType) &&
            <div>
                <ControlText />
                <hr className='control-divider'/>
            </div>}
            {['Line', 'Lines', 'Selected', 'none'].includes(selectedType) === false &&
            <div>
                <ControlFill />
                <hr className='control-divider'/>
            </div>}
            {selectedType !== 'none' &&
            <div>
                <ControlBorder />
                <hr className='control-divider'/>
            </div>}
            
            <div className='control-title'>
                <div>
                    <h4 className='control-group-title'>Export</h4>
                </div>
                <div className='control-group'>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Format</label>
                        <select>
                            <option>PDF</option>
                            <option>PNG</option>
                            <option>JPG</option>
                        </select>
                    </form>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Name</label>
                        <input style={{width: "12rem"}} type="text" value="First Draft Export" />
                    </form>
                    <button>Download File</button>
                </div>
            </div>
            <br />
            <br />
        </div>
    )
}