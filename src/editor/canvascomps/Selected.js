import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectDraft, DeselectObject, DeselectParticularObject } from '../../features/draftSlice';

import { ClickOutsideSelected } from '../../Functions';
import { getSelectedItemStats, getSelectedStats } from '../../Functions';

export default function Selected() {
    const dispatch = useDispatch();
    
    const draftInfo = useSelector(selectDraft);
    const selected = draftInfo.selectedObject;
    const zoom = draftInfo.statistics.zoom;

    const wrapperRef = React.useRef(null);
    ClickOutsideSelected(wrapperRef);

    

    const subSelected = selected.map((item, index) => {
        if (item.type === 'Line') {
            return (
                <div style={{position: "absolute", border:"solid rgb(0,160,197) 0.2mm",
                top: `calc(${(+item.y) / +draftInfo.canvasSettings.height * 100}% - 0.6mm)`, left: `calc(${(+item.x) / +draftInfo.canvasSettings.width * 100}% - 0.6mm)`, height: `calc(${(+item.borderWidth) / +draftInfo.canvasSettings.height * 100}% + 0.4mm)`, width: `calc(${(+item.width) / +draftInfo.canvasSettings.width * 100}% + 0.4mm)`,
                cursor: 'move', zIndex: '10000000', transform: `rotate(${+item.rotate}deg)`}}
                onClick={(event) => {
                    if (event.shiftKey === true) {
                        dispatch(DeselectParticularObject(index));
                    }
                }}>
                </div>
            )
        } 
        if (item.type === 'Text') {
            return (
                <div>
                    <div style={{position: "absolute", border:"solid rgb(0,160,197) 0.2mm",
                    top: `calc(${(+item.y) / +draftInfo.canvasSettings.height * 100}% - 0.6mm)`, left: `calc(${(+item.x) / +draftInfo.canvasSettings.width * 100}% - 0.6mm)`, height: `calc(${(+item.height + (+item.borderWidth) * 2) / +draftInfo.canvasSettings.height * 100}% + 1mm)`, width: `calc(${(+item.width + (+item.borderWidth) * 2) / +draftInfo.canvasSettings.width * 100}% + 1mm)`,
                    transform: `rotate(${+item.rotate}deg)`, borderRadius: item.type === 'Ellipse' ? '50%' : `${item.radius[0] * zoom}mm ${item.radius[1] * zoom}mm ${item.radius[2] * zoom}mm ${item.radius[3] * zoom}mm`,
                    pointerEvents: 'none', zIndex: '10000000'}}></div>
                    <div style={{position: "absolute", border:"solid transparent 0.2mm",
                    top: `calc(${(+item.y) / +draftInfo.canvasSettings.height * 100}% - 0.6mm)`, left: `calc(${(+item.x) / +draftInfo.canvasSettings.width * 100}% - 0.6mm)`, height: `calc(${(+item.height + (+item.borderWidth) * 2) / +draftInfo.canvasSettings.height * 100}% + 1mm)`, width: `calc(${(+item.width + (+item.borderWidth) * 2) / +draftInfo.canvasSettings.width * 100}% + 1mm)`,
                    transform: `rotate(${+item.rotate}deg)`, borderRadius: item.type === 'Ellipse' ? '50%' : `${item.radius[0] * zoom}mm ${item.radius[1] * zoom}mm ${item.radius[2] * zoom}mm ${item.radius[3] * zoom}mm`,
                    cursor: 'move', zIndex: `${+item.zIndex - 1}`}}
                    onClick={(event) => {
                        if (event.shiftKey === true) {
                            dispatch(DeselectParticularObject(index));
                        }
                    }}></div>
                </div>
            )
        }
        return (
        <div style={{position: "absolute", border:"solid rgb(0,160,197) 0.2mm",
        top: `calc(${(+item.y) / +draftInfo.canvasSettings.height * 100}% - 0.6mm)`, left: `calc(${(+item.x) / +draftInfo.canvasSettings.width * 100}% - 0.6mm)`, height: `calc(${(+item.height + (+item.borderWidth) * 2) / +draftInfo.canvasSettings.height * 100}% + 1mm)`, width: `calc(${(+item.width + (+item.borderWidth) * 2) / +draftInfo.canvasSettings.width * 100}% + 1mm)`,
        transform: `rotate(${+item.rotate}deg)`, borderRadius: item.type === 'Ellipse' ? '50%' : `${item.radius[0] * zoom}mm ${item.radius[1] * zoom}mm ${item.radius[2] * zoom}mm ${item.radius[3] * zoom}mm`,
        cursor: 'move', zIndex: '10000000'}}
        onClick={(event) => {
            if (event.shiftKey === true) {
                dispatch(DeselectParticularObject(index));
            }
        }}></div>
        )
    })
    
    const selectedItemStats = getSelectedItemStats(selected)
    const selectedStats = getSelectedStats(selectedItemStats);
    
    const left = selectedStats.leftBound;
    const top = selectedStats.topBound;
    const width = selectedStats.selectedWidth;
    const height = selectedStats.selectedHeight;
   
    return (
        <div ref={wrapperRef}>
            <div style={{position: "absolute", border:"solid rgb(0,160,197) 0.5mm",
            top: `${(top - 1.5) / +draftInfo.canvasSettings.height * 100}%`, left: `${(left - 1.5) / +draftInfo.canvasSettings.width * 100}%`, height: `${(height + 2) / +draftInfo.canvasSettings.height * 100}%`, width: `${(width + 2) / +draftInfo.canvasSettings.width * 100}%`,
            pointerEvents: 'none', zIndex: '10000001'}}>
                {width*zoom > 16 &&
                    <div style={{position: 'absolute', width: '8mm', height: '2mm', borderRadius: '1.5mm', backgroundColor: 'rgb(98, 201, 245)', zIndex: '10000001',
                    top: 'calc(100% - 1mm)', left: 'calc(50% - 4mm)', pointerEvents: 'auto', cursor: 's-resize', boxShadow: '0 0.2mm lightGray'}}></div>
                }    
                {height*zoom > 16 &&
                    <div style={{position: 'absolute', width: '2mm', height: '8mm', borderRadius: '1.5mm', backgroundColor: 'rgb(98, 201, 245)', zIndex: '10000001',
                    left: 'calc(100% - 1mm)', top: 'calc(50% - 4mm)', pointerEvents: 'auto', cursor: 'e-resize', boxShadow: '0.2mm 0 lightGray'}}></div>

                }
                <div>
                    <div style={{position: 'absolute', width: '6mm', height: '2.5mm', borderRadius: '1.5mm', backgroundColor: 'rgb(19, 174, 240)', zIndex: '10000001',
                    top: 'calc(100% - 1.25mm)', left: 'calc(100% - 5mm)', pointerEvents: 'auto', cursor: 'se-resize', boxShadow: '0 0.2mm lightGray'}}></div>
                    <div style={{position: 'absolute', width: '2.5mm', height: '6mm', borderRadius: '1.5mm', backgroundColor: 'rgb(19, 174, 240)', zIndex: '10000001',
                    left: 'calc(100% - 1.25mm)', top: 'calc(100% - 4.75mm)', pointerEvents: 'auto', cursor: 'se-resize', boxShadow: '0.2mm 0 lightGray'}}></div>
                </div>
            </div>
            {subSelected}
        </div>
        
    )
}