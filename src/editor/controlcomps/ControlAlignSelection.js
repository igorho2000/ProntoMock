import React from 'react';
import '../editor.css';

import { useSelector, useDispatch } from 'react-redux';

import { selectDraft, MoveSelectedToBack, MoveSelectedToFront,
    ChangeEachSelectedProperties, SaveDraft } from '../../features/draftSlice';

import { getSelectedItemStats, getSelectedStats } from '../../Functions';

export default function ControlAlignSelection() {

    const dispatch = useDispatch();

    const draftInfo = useSelector(selectDraft);
    const selected = draftInfo.selectedObject;

    const selectedItemStats = getSelectedItemStats(selected);
    const selectedStats = getSelectedStats(selectedItemStats);

    function AlignLeft() {
        const output = selectedItemStats.map((item) => {
            return selectedStats.leftBound + item.widthDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['x', output]));
        dispatch(SaveDraft());
    }

    function AlignRight() {
        const output = selectedItemStats.map((item) => {
            return selectedStats.rightBound - item.visualWidth + item.widthDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['x', output]));
        dispatch(SaveDraft());
    }
    function AlignTop() {
        const output = selectedItemStats.map((item) => {
            return selectedStats.topBound + item.heightDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['y', output]));
        dispatch(SaveDraft());
    }

    function AlignBottom() {
        const output = selectedItemStats.map((item) => {
            return selectedStats.bottomBound - item.visualHeight + item.heightDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['y', output]));
        dispatch(SaveDraft());
    }
    function AlignHorizontalCenter() {
        const output = selectedItemStats.map((item) => {
            return selectedItemStats[0].centerLeft - item.visualWidth / 2 + item.widthDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['x', output]));
        dispatch(SaveDraft());
    }
    function AlignVerticalCenter() {
        const output = selectedItemStats.map((item) => {
            return selectedItemStats[0].centerTop - item.visualHeight / 2 + item.heightDif;
        }) 
        dispatch(ChangeEachSelectedProperties(['y', output]));
        dispatch(SaveDraft());
    }
    function DistributeHorizontal() {
        if (selectedItemStats.length === 2) {
            return
        }
        const totalElements = selectedItemStats.length;
        const sortByLeft = selectedItemStats.sort((a, b) => a.visualLeft > b.visualLeft ? 1 : -1);
        const LeftBound = sortByLeft.shift();
        const sortByRight = sortByLeft.sort((a, b) => a.visualRight > b.visualRight ? -1 : 1);
        const RightBound = sortByRight.shift();
        const sortByCenter = sortByRight.sort((a, b) => a.centerLeft > b.centerLeft ? 1 : -1);
        var newCenters = []
        for (let i = 0; i < totalElements; i++) {
            newCenters[i] = LeftBound.centerLeft + ((RightBound.centerLeft - LeftBound.centerLeft) / (totalElements - 1)) * i
        }
        sortByCenter.unshift(LeftBound);
        sortByCenter.push(RightBound);
        for (let i = 0; i < totalElements; i++) {
            sortByCenter[i].centerLeft = newCenters[i];
            sortByCenter[i].visualLeft = newCenters[i] - sortByCenter[i].visualWidth / 2
        }
        const toOutput = sortByCenter.sort((a, b) => a.index > b.index ? 1 : -1);
        const output = toOutput.map((item) => (item.visualLeft + item.widthDif))
        dispatch(ChangeEachSelectedProperties(['x', output]));
        dispatch(SaveDraft());
    }
    
    function DistributeVertical() {
        if (selectedItemStats.length === 2) {
            return
        }
        const totalElements = selectedItemStats.length;
        const sortByTop = selectedItemStats.sort((a, b) => a.visualTop > b.visualTop ? 1 : -1);
        const TopBound = sortByTop.shift();
        const sortByBottom = sortByTop.sort((a, b) => a.visualBottom > b.visualBottom ? -1 : 1);
        const BottomBound = sortByBottom.shift();
        const sortByCenter = sortByBottom.sort((a, b) => a.centerTop > b.centerTop ? 1 : -1);
        var newCenters = []
        for (let i = 0; i < totalElements; i++) {
            newCenters[i] = TopBound.centerTop + ((BottomBound.centerTop - TopBound.centerTop) / (totalElements - 1)) * i
        }
        sortByCenter.unshift(TopBound);
        sortByCenter.push(BottomBound);
        for (let i = 0; i < totalElements; i++) {
            sortByCenter[i].centerTop = newCenters[i];
            sortByCenter[i].visualTop = newCenters[i] - sortByCenter[i].visualHeight / 2
        }
        const toOutput = sortByCenter.sort((a, b) => a.index > b.index ? 1 : -1);
        const output = toOutput.map((item) => (item.visualTop + item.heightDif))
        dispatch(ChangeEachSelectedProperties(['y', output]));
        dispatch(SaveDraft());
    }

    return (
        <div className='control-title'>
            <div>
                <h4 className='control-group-title'>Align Selection</h4>
            </div>
            <div className='control-group'>
                <form className='control-form-long'>
                    <img src="../properties/align_horizontal_left.svg" onClick={AlignLeft} alt='align left' />
                    <img src="../properties/align_horizontal_center.svg" onClick={AlignHorizontalCenter} alt='align horizontal center'/>
                    <img src="../properties/align_horizontal_right.svg" onClick={AlignRight} alt='align right' />
                    <img src="../properties/align_vertical_top.svg" onClick={AlignTop} alt='align top' />
                    <img src="../properties/align_vertical_center.svg" onClick={AlignVerticalCenter} alt='align vertical center' />
                    <img src="../properties/align_vertical_bottom.svg" onClick={AlignBottom} alt='align bottom' />
                    <img src="../properties/horizontal_distribute.svg" onClick={DistributeHorizontal} alt='distribute horizontal' />
                    <img src="../properties/vertical_distribute.svg" onClick={DistributeVertical} alt='distribute vertical' />
                </form>
                <form className='control-form'>
                    <label style={{width: "5.5rem"}}>Move to Front</label>
                    <img src="../properties/move_up.svg" onClick={() => {
                        dispatch(MoveSelectedToFront());
                        dispatch(SaveDraft());
                    }} alt='move to front' />
                </form>
                <form className='control-form'>
                    <label style={{width: "5.5rem"}}>Move to Back</label>
                    <img src="../properties/move_down.svg" onClick={() => {
                        dispatch(MoveSelectedToBack());
                        dispatch(SaveDraft());
                    }} alt='move to back' />
                </form>
            </div>
        </div>
    )
}