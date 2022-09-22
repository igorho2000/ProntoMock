import React from 'react';

import './Transition.css';


export default function Transition() {
    return (
        <div className='transition'>
            <div className='transition-cont'>
                <img className="transition-left" src="../../transition/left.svg" alt="transition animation element" />
                <img className="transition-bottom" src="../../transition/bottom.svg" alt="transition animation element" />
                <img className="transition-right" src="../../transition/right.svg" alt="transition animation element" />
                <img className="transition-top" src="../../transition/top.svg" alt="transition animation element" />
                <img className="transition-square" src="../../transition/square.svg" alt="transition animation element" />
                <img className="transition-pm" src="../../transition/pm.svg" alt="transition animation element" />
                <div className='transition-line'></div>
                <div className='transition-progress'></div>
            </div>
        </div>
    )
    
}