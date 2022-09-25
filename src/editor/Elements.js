import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

export default function Elements() {
    const dispatch = useDispatch();

    return (
        <div className='elements'>
            <div className='elements-function'>
                <img className='elements-icon' src="../properties/text.svg" />
                <div className='elements-description'>Text</div>
            </div>
            <div className='elements-function'>
                <img className='elements-icon' src="../properties/rectangle.svg" />
                <div className='elements-description'>Rectangle</div>
            </div>
            <div className='elements-function'>
                <img className='elements-icon' src="../properties/ellipse.svg" />
                <div className='elements-description'>Ellipse</div>
            </div>
            <div className='elements-function'>
                <img className='elements-icon' src="../properties/line.svg" />
                <div className='elements-description'>Line</div>
            </div>
            <div className='elements-function'>
                <img className='elements-icon' src="../properties/pen.svg" />
                <div className='elements-description'>Pen</div>
            </div>
            <div className='elements-function'>
                <img className='elements-icon' src="../properties/icon.svg" />
                <div className='elements-description'>Icon</div>
            </div>
        </div>
    )
}