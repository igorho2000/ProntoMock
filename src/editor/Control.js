import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import { selectDraft } from '../features/draftSlice';

import ControlDocument from './controlcomps/ControlDocument';
import ControlDimensions from './controlcomps/ControlDimensions';
import ControlText from './controlcomps/ControlText';
import ControlFill from './controlcomps/ControlFill';
import ControlBorder from './controlcomps/ControlBorder';
import ControlAlignSelection from './controlcomps/ControlAlignSelection';
import ControlAlignToMargin from './controlcomps/ControlAlignToMargin';
import ControlExport from './controlcomps/ControlExport';

export default function Control() {
    const draft = useSelector(selectDraft);
    const selectedType = draft.statistics.selected;

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
                <ControlAlignToMargin />
                <hr className='control-divider'/>
            </div>}
            {['Lines', 'Texts', 'Ellipses', 'Squares', 'Selected'].includes(selectedType) &&
            <div>
                <ControlAlignSelection />
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
            <ControlExport />
            
            <br />
            <br />
        </div>
    )
}