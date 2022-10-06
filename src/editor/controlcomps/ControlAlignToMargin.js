import React from 'react';
import '../editor.css';

export default function ControlAlignToMargin() {
    return (
        <div className='control-title'>
            <div>
                <h4 className='control-group-title'>Align to Margin</h4>
            </div>
            <div className='control-group'>
                <form className='control-form-long'>
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
    )
}