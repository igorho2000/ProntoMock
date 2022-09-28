import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import ControlDocument from './controlcomps/ControlDocument';
import ControlDimensions from './controlcomps/ControlDimensions';
import ControlAlign from './controlcomps/ControlAlign';
import ControlText from './controlcomps/ControlText';
import ControlFill from './controlcomps/ControlFill';
import ControlBorder from './controlcomps/ControlBorder';

export default function Control() {

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
                <h3 style={{fontWeight: "400"}}>Draft Settings</h3>
            </div>
            <hr className='control-divider'/>
            <ControlDocument />
            <hr className='control-divider'/>
            <ControlDimensions />
            <hr className='control-divider'/>
            <ControlAlign selection={false} />
            <hr className='control-divider'/>
            <ControlAlign selection={true} />
            <hr className='control-divider'/>
            <ControlText />
            <hr className='control-divider'/>
            <ControlFill />
            <hr className='control-divider'/>
            <ControlBorder />
            <hr className='control-divider'/>
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