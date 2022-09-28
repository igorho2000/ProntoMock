import React from 'react';
import '../editor.css';

export default function ControlAlign(props) {
    return (
        <div className='control-title'>
            <div>
                <h4 className='control-group-title'>{`Align ${props.selection ? "Selection" : "to Margin"}`}</h4>
            </div>
            <div className='control-group'>
                <form className='control-form-long'>
                    <img src="../properties/align_horizontal_left.svg" />
                    <img src="../properties/align_horizontal_center.svg" />
                    <img src="../properties/align_horizontal_right.svg" />
                    <img src="../properties/align_vertical_top.svg" />
                    <img src="../properties/align_vertical_center.svg" />
                    <img src="../properties/align_vertical_bottom.svg" />
                    {props.selection && <img src="../properties/horizontal_distribute.svg" />}
                    {props.selection && <img src="../properties/vertical_distribute.svg" />}
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