import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectDraft, DeselectObject, DeselectParticularObject } from '../../features/draftSlice';

import { ClickOutsideSelected } from '../../Functions';

export default function Selected() {
    const dispatch = useDispatch();
    
    const draftInfo = useSelector(selectDraft);
    const selected = draftInfo.selectedObject;
    const zoom = draftInfo.statistics.zoom;

    const wrapperRef = React.useRef(null);
    ClickOutsideSelected(wrapperRef);

    function DegreeCalc(degree) {
        var rotate = 0;
        if (degree <= 90) {
            rotate = degree * Math.PI/180;
        } else if (degree <= 180 && degree > 90) {
            rotate = (180 - degree) * Math.PI/180
        } else if (degree <= 270 && degree > 180) {
            rotate = (degree - 180) * Math.PI/180
        } else if (degree <= 360 && degree > 270) {
            rotate = (360 - degree) * Math.PI/180
        }
        return rotate
    }
    
    function getDimensions() {
        var left = 10000000;
        var top = 10000000;
        var width = 0;
        var height = 0;
        selected.map((item) => {
            const rotate = DegreeCalc(+item.rotate);
            const leftbound = item.type === 'Line' ? (+item.x + (+item.width) / 2) - ((+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate)) / 2 : (+item.x + (+item.width + +item.borderWidth * 2) / 2) - ((+item.width + +item.borderWidth * 2) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate)) / 2;
            const topbound = item.type === 'Line' ? (+item.y + (+item.height + +item.borderWidth) / 2) - ((+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate)) / 2 : (+item.y + (+item.height + +item.borderWidth * 2) / 2) - ((+item.width + +item.borderWidth *2) * Math.sin(rotate) + (+item.height + +item.borderWidth *2) * Math.cos(rotate)) / 2;
            if (leftbound <= left) {
                left = leftbound;
            }
            if (topbound <= top) {
                top = topbound;
            }
        })
        selected.map((item) => {
            const rotate = DegreeCalc(+item.rotate);
            const leftbound = item.type === 'Line' ? (+item.x + (+item.width) / 2) - ((+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth) * Math.sin(rotate)) / 2 : (+item.x + (+item.width + +item.borderWidth * 2) / 2) - ((+item.width + +item.borderWidth * 2) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate)) / 2;
            const topbound = item.type === 'Line' ? (+item.y + (+item.height + +item.borderWidth) / 2) - ((+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate)) / 2 : (+item.y + (+item.height + +item.borderWidth * 2) / 2) - ((+item.width + +item.borderWidth *2) * Math.sin(rotate) + (+item.height + +item.borderWidth *2) * Math.cos(rotate)) / 2;
            const widthcalc = item.type === 'Line' ? (+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth) * Math.sin(rotate) : (+item.width + +item.borderWidth * 2) * Math.cos(rotate) + (+item.height + +item.borderWidth * 2) * Math.sin(rotate);
            const heightcalc = item.type === 'Line' ? (+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate) : (+item.width + +item.borderWidth * 2) * Math.sin(rotate) + (+item.height + +item.borderWidth * 2) * Math.cos(rotate);
            if ((leftbound + widthcalc) >= (left + width)) {
                width = (leftbound + widthcalc) - left;
            }
            if ((topbound + heightcalc) >= (top + height)) {
                height = (topbound + heightcalc) - top;
            }
        })
        
        return [left, top, width, height]
    }
    const [left, top, width, height] = getDimensions();

    const [position, setPosition] = React.useState({
        left: 0,
        top: 0,
        mouseX: 0,
        mouseY: 0,
        x: 0,
        y: 0,
    })

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
    

    return (
        <div ref={wrapperRef}>
            <div style={{position: "absolute", border:"solid rgb(0,160,197) 0.5mm",
            top: `${(top - 1) / +draftInfo.canvasSettings.height * 100}%`, left: `${(left - 1) / +draftInfo.canvasSettings.width * 100}%`, height: `${(height + 2) / +draftInfo.canvasSettings.height * 100}%`, width: `${(width + 1) / +draftInfo.canvasSettings.width * 100}%`,
            pointerEvents: 'none', zIndex: '10000000'}}>
            </div>
            {subSelected}
        </div>
        
    )
}