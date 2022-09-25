import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

export default function Canvas() {
    return (
        <div className='canvas'>
            <div className='draft-cont'>
                <div className='canvas-buffer'></div>
                <div className='draft'>

                </div>
                <div className='canvas-buffer'></div>
                <div className='margin'></div>
            </div>
            
        </div>
    )
}