import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectDraft } from '../../features/draftSlice';

export default function Selected() {
    const draftInfo = useSelector(selectDraft);
    const selected = draftInfo.selectedObject;

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
            const leftbound = item.type === 'Line' ? (+item.x + (+item.width) / 2) - ((+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate)) / 2 : (+item.x + (+item.width + +item.borderWidth *2) / 2) - ((+item.width + +item.borderWidth *2) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate)) / 2;
            const topbound = item.type === 'Line' ? (+item.y + (+item.height + +item.borderWidth) / 2) - ((+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate)) / 2 : (+item.y + (+item.height + +item.borderWidth *2) / 2) - ((+item.width + +item.borderWidth *2) * Math.sin(rotate) + (+item.height + +item.borderWidth *2) * Math.cos(rotate)) / 2;
            if (leftbound <= left) {
                left = leftbound;
            }
            if (topbound <= top) {
                top = topbound;
            }
            console.log([left, top, width, height])
        })
        selected.map((item) => {
            const rotate = DegreeCalc(+item.rotate);
            const leftbound = item.type === 'Line' ? (+item.x + (+item.width) / 2) - ((+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth) * Math.sin(rotate)) / 2 : (+item.x + (+item.width + +item.borderWidth *2) / 2) - ((+item.width + +item.borderWidth *2) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate)) / 2;
            const topbound = item.type === 'Line' ? (+item.y + (+item.height + +item.borderWidth) / 2) - ((+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate)) / 2 : (+item.y + (+item.height + +item.borderWidth *2) / 2) - ((+item.width + +item.borderWidth *2) * Math.sin(rotate) + (+item.height + +item.borderWidth *2) * Math.cos(rotate)) / 2;
            const widthcalc = item.type === 'Line' ? (+item.width) * Math.cos(rotate) + (+item.height + +item.borderWidth) * Math.sin(rotate) : (+item.width + +item.borderWidth *2) * Math.cos(rotate) + (+item.height + +item.borderWidth *2) * Math.sin(rotate);
            const heightcalc = item.type === 'Line' ? (+item.width) * Math.sin(rotate) + (+item.height + +item.borderWidth) * Math.cos(rotate) : (+item.width + +item.borderWidth *2) * Math.sin(rotate) + (+item.height + +item.borderWidth *2) * Math.cos(rotate);
            if ((leftbound + widthcalc) >= (left + width)) {
                width = (leftbound + widthcalc) - left;
            }
            if ((topbound + heightcalc) >= (top + height)) {
                height = (topbound + heightcalc) - top;
            }
            console.log([left, top, width, height])
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
    // Solve!
    const subSelected = selected.map((item) => (
        <div style={{position: "absolute", border:"solid black 0.5mm",
        top: `${(item.y - top - 0.5) / height * 100}%`, left: `${(item.x - left - 0.5) / width * 100}%`, height: `${(item.height + item.borderWidth * 2) / height * 100}%`, width: `${(item.width) / width * 100}%`
        }}></div>
    ))

    return (
        <div style={{position: "absolute", border:"solid black 0.5mm",
        top: `${(top - 0.5) / draftInfo.canvasSettings.height * 100}%`, left: `${(left - 0.5) / draftInfo.canvasSettings.width * 100}%`, height: `${(height + 1) / draftInfo.canvasSettings.height * 100}%`, width: `${(width + 0.5) / draftInfo.canvasSettings.width * 100}%`
        }}>
            {subSelected}
        </div>
    )
}