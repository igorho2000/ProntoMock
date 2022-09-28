import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import ControlDocument from './controlcomps/ControlDocument';

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
                        <input type="text" value="5" />
                    </form>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Radius</label>
                        <div className='control-form-input'>
                            <input style={{borderRight: "none", borderBottom: "none", borderWidth: '2px'}} type="text" value="5" />
                            <input style={{borderLeft: "none", borderBottom: "none", borderWidth: '2px'}} type="text" value="5" />
                            <input style={{borderLeft: "none", borderTop: "none", borderWidth: '2px'}} type="text" value="5" />
                            <input style={{borderRight: "none", borderTop: "none", borderWidth: '2px'}} type="text" value="5" />
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
                    <h4 className='control-group-title'>Align to Margin</h4>
                </div>
                <div className='control-group'>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <img src="../properties/align_horizontal_left.svg" />
                        <img src="../properties/align_horizontal_center.svg" />
                        <img src="../properties/align_horizontal_right.svg" />
                        <img src="../properties/align_vertical_top.svg" />
                        <img src="../properties/align_vertical_center.svg" />
                        <img src="../properties/align_vertical_bottom.svg" />
                    </form>
                    <form className='control-form'>
                        <label style={{width: "5.5rem"}}>Move to Front</label>
                        <img src="../properties/move_up.svg" />
                    </form>
                    <form className='control-form'>
                        <label style={{width: "5.5rem"}}>Move to Back</label>
                        <img src="../properties/move_down.svg" />
                    </form>
                </div>
            </div>
            <hr className='control-divider'/>
            <div className='control-title'>
                <div>
                    <h4 className='control-group-title'>Align Selection</h4>
                </div>
                <div className='control-group'>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <img src="../properties/align_horizontal_left.svg" />
                        <img src="../properties/align_horizontal_center.svg" />
                        <img src="../properties/align_horizontal_right.svg" />
                        <img src="../properties/align_vertical_top.svg" />
                        <img src="../properties/align_vertical_center.svg" />
                        <img src="../properties/align_vertical_bottom.svg" />
                        <img src="../properties/horizontal_distribute.svg" />
                        <img src="../properties/vertical_distribute.svg" />
                    </form>
                </div>
            </div>
            <hr className='control-divider'/>
            <div className='control-title'>
                <div>
                    <h4 className='control-group-title'>Text</h4>
                </div>
                <div className='control-group'>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Style</label>
                        <img style={{marginLeft:"5px", height: "1.2rem", marginTop: 0}} src="../properties/bold.svg" />
                        <img style={{height: "1.2rem", marginTop: 0}} src="../properties/underlined.svg" />
                        <img style={{height: "1.2rem", marginTop: 0}} src="../properties/italic.svg" />
                    </form>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Align</label>
                        <img style={{marginLeft:"5px", height: "1.2rem", marginTop: 0}} src="../properties/format_align_left.svg" />
                        <img style={{height: "1.2rem", marginTop: 0}} src="../properties/format_align_center.svg" />
                        <img style={{height: "1.2rem", marginTop: 0}} src="../properties/format_align_right.svg" />
                        <img style={{height: "1.2rem", marginTop: 0}} src="../properties/format_align_justify.svg" />
                        <img style={{height: "1.2rem", marginTop: 0}} src="../properties/vertical_align_top.svg" />
                        <img style={{height: "1.2rem", marginTop: 0}} src="../properties/vertical_align_center.svg" />
                        <img style={{height: "1.2rem", marginTop: 0}} src="../properties/vertical_align_bottom.svg" />
                    </form>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Font</label>
                        <select>
                            <option>Sans Serif</option>
                            <option>Ariel</option>
                            <option>Serif</option>
                        </select>
                    </form>
                    
                    <form className='control-form' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Size</label>
                        <input type="text" value="24" />
                    </form>
                    
                    <form className='control-form-color' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Color</label>
                        <input type="text" value="#00FF00" />
                        <div></div>
                    </form>
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
            <hr className='control-divider'/>
            <div className='control-title'>
                <div>
                    <h4 className='control-group-title'>Border</h4>
                </div>
                <div className='control-group'>
                    
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Style</label>
                        <select style={{borderRight: "none", borderBottom: "none", borderLeft: "none", borderWidth: '2px'}}>
                            <option>None</option>
                            <option>Solid</option>
                            <option>Dashed</option>
                            <option>Dotted</option>
                        </select>
                        <select style={{borderTop: "none", borderBottom: "none", borderLeft: "none", borderWidth: '2px'}}>
                            <option>None</option>
                            <option>Solid</option>
                            <option>Dashed</option>
                            <option>Dotted</option>
                        </select>
                    </form>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label></label>
                        <select style={{borderRight: "none", borderTop: "none", borderLeft: "none", borderWidth: '2px'}}>
                            <option>None</option>
                            <option>Solid</option>
                            <option>Dashed</option>
                            <option>Dotted</option>
                        </select>
                        <select style={{borderRight: "none", borderBottom: "none", borderTop: "none", borderWidth: '2px'}}>
                            <option>None</option>
                            <option>Solid</option>
                            <option>Dashed</option>
                            <option>Dotted</option>
                        </select>
                    </form>
                    <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label> Width</label>
                        <div className='control-form-input'>
                            <input style={{borderRight: "none", borderBottom: "none", borderLeft: "none", borderWidth: '2px'}} type="text" value="5" />
                            <input style={{borderLeft: "none", borderBottom: "none", borderTop: "none", borderWidth: '2px'}} type="text" value="5" />
                            <input style={{borderLeft: "none", borderTop: "none", borderRight: "none", borderWidth: '2px'}} type="text" value="5" />
                            <input style={{borderRight: "none", borderTop: "none", borderBottom: "none", borderWidth: '2px'}} type="text" value="5" />
                        </div>
                    </form>
                    <form className='control-form-color' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label>Color</label>
                        <input type="text" value="#00FF00" style={{borderRight: "none", borderBottom: "none", borderLeft: "none", borderWidth: '2px'}} />
                        <div></div>
                        <input type="text" value="#00FF00" style={{borderLeft: "none", borderBottom: "none", borderTop: "none", borderWidth: '2px'}} />
                        <div></div>
                    </form>
                    <form className='control-form-color' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                        <label></label>
                        <input type="text" value="#00FF00" style={{borderLeft: "none", borderTop: "none", borderRight: "none", borderWidth: '2px'}} />
                        <div></div>
                        <input type="text" value="#00FF00" style={{borderRight: "none", borderTop: "none", borderBottom: "none", borderWidth: '2px'}} />
                        <div></div>
                    </form>
                    <div className='control-form-check'>
                        <input type="checkbox" id="border" />
                        <label for="border">Different border style on each side</label>
                    </div>
                </div>
            </div>
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