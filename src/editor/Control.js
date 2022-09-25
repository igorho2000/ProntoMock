import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

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
            <div className='control-title'>
                <div>
                    <h4 className='control-group-title'>Document</h4>
                </div>
                <div className='control-group'>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Width</label>
                        <input type="text" value="-5555" />
                    </form>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Height</label>
                        <input type="text" value="5" />
                    </form>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Unit</label>
                        <select>
                            <option>in</option>
                            <option>mm</option>
                            <option>cm</option>
                            <option>pt</option>
                            <option>px</option>
                        </select>
                    </form>
                    <form className='control-form-color' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Fill</label>
                        <input type="text" value="#00FF00" />
                        <div></div>
                    </form>
                </div>
                
            </div>
            <hr className='control-divider'/>
            <div className='control-title'>
                <div>
                    <h4 className='control-group-title'>Dimensions</h4>
                </div>
                <div className='control-group'>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Width</label>
                        <input type="text" value="-5555" />
                    </form>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Height</label>
                        <input type="text" value="5" />
                    </form>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>X</label>
                        <input type="text" value="5" />
                    </form>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Y</label>
                        <input type="text" value="5" />
                    </form>
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Rotate</label>
                        <input type="text" value="5 °" />
                    </form>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Radius</label>
                        <div className='control-form-input'>
                            <input style={{borderRight: "none", borderBottom: "none"}} type="text" value="5" />
                            <input style={{borderLeft: "none", borderBottom: "none"}} type="text" value="5" />
                            <input style={{borderLeft: "none", borderTop: "none"}} type="text" value="5" />
                            <input style={{borderRight: "none", borderTop: "none"}} type="text" value="5" />
                        </div>
                    </form>
                    <div className='control-form-check'>
                        <input type="checkbox" id="radius" />
                        <label for="radius">Different radius on each corner</label>
                    </div>
                    
                </div>
            </div>
            <hr className='control-divider'/>
            <div className='control-title'>
                <div>
                    <h4 className='control-group-title'>Fill</h4>
                </div>
                <div className='control-group'>
                    <form className='control-form-color' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Color</label>
                        <input type="text" value="#00FF00" />
                        <div></div>
                    </form>
                </div>
            </div>
        </div>
    )
}