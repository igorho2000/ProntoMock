import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import { selectDraft, MoveSelected,
    DeleteSelected, SaveDraft, UndoAction, PasteSelected, DuplicateSelected, SortEveryObjectByZ, ZoomInOutDraft, SizeXSelected, SizeYSelected, SizeXYSelected } from '../features/draftSlice';

import { selectEveryPopup, showPopup, getCoordinates } from '../features/popupSlice';

import Line from './canvascomps/Line';
import Shape from './canvascomps/Shape';
import Textbox from './canvascomps/Textbox';
import Selected from './canvascomps/Selected';
import Image from './canvascomps/Image'

import { getSelectedItemStats, getSelectedStats } from '../Functions';
import CanvasRightClick from './canvascomps/CanvasRightClick';
import Icon from './canvascomps/Icon';

export default function Canvas() {

    const draftInfo = useSelector(selectDraft);
    const canvasInfo = draftInfo.canvasSettings;
    const saved = draftInfo.savedVersions;
    const selected = draftInfo.selectedObject;
    const zoom = draftInfo.statistics.zoom;

    const popup = useSelector(selectEveryPopup);

    const dispatch = useDispatch();

    const draftElementsOutput = draftInfo.everyObject.map((item, index) => {
        var output = '';
        
        switch (item.type) {
            case 'Text':
                output = <Textbox element={item} selected={false} index={index} key={`everyObject${index}`} />;
                break
            case 'Ellipse':
                output = <Shape element={item} ellipse={true} selected={false} index={index} key={`everyObject${index}`} />;
                break
            case 'Square':
                output = <Shape element={item} ellipse={false} selected={false} index={index} key={`everyObject${index}`} />;
                break
            case 'Line':
                output = <Line element={item} selected={false} index={index} key={`everyObject${index}`} />
                break
            case 'Image':
                output = <Image element={item} selected={false} index={index} key={`everyObject${index}`} />
                break
            case 'Icon':
                output = <Icon element={item} selected={false} index={index} key={`everyObject${index}`} />
                break
        }

        return output
    })

    const selectedElementsOutput = draftInfo.selectedObject.map((item, index) => {
        var output = '';
        
        switch (item.type) {
            case 'Text':
                output = <Textbox element={item} selected={true} index={index} key={`selectedObject${index}`}  />;
                break
            case 'Ellipse':
                output = <Shape element={item} ellipse={true} selected={true} index={index} key={`selectedObject${index}`} />;
                break
            case 'Square':
                output = <Shape element={item} ellipse={false} selected={true} index={index} key={`selectedObject${index}`} />;
                break
            case 'Line':
                output = <Line element={item} selected={true} index={index} key={`selectedObject${index}`} />
                break
            case 'Image':
                output = <Image element={item} selected={true} index={index} key={`selectedObject${index}`} />
                break
            case 'Icon':
                output = <Icon element={item} selected={true} index={index} key={`selectedObject${index}`} />
                break
        }

        return output
    })

    function handleKeyDown(ev) {
        ev = ev || window.event;
          var key = ev.which || ev.keyCode;
          var ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17)
              ? true : false);
          var selectedString = ''
          // ctrl V
          if (key == 86 && ctrl) {
            if (localStorage.getItem('clipboard') === null) {
                return
            }
            const paste = localStorage.getItem('clipboard').split('/\}{|');
            paste.splice(-1,1);
            const pasteArray = paste.map((item) => (
              JSON.parse(item)
            ))
            dispatch(PasteSelected(pasteArray));
            dispatch(SortEveryObjectByZ())
            dispatch(SaveDraft());
          }
          // ctrl C
          else if (key == 67 && ctrl) { 
            selected.map((item) => {
              selectedString += JSON.stringify(item) + '/\}{|';
            })
            localStorage.setItem('clipboard', selectedString);
          }
        //    ctrl X
          else if (key == 88 && ctrl) {
            selected.map((item) => {
                selectedString += JSON.stringify(item) + '/\}{|';
              })
            localStorage.setItem('clipboard', selectedString);
            dispatch(DeleteSelected());
            dispatch(SortEveryObjectByZ());
            dispatch(SaveDraft());
          }
          // ctrl D
          else if (key == 68 && ctrl) {
            ev.preventDefault();
            dispatch(DuplicateSelected());
            dispatch(MoveSelected([10, 10]));
            dispatch(SortEveryObjectByZ())
            dispatch(SaveDraft());
          }
          // delete 
          else if (key === 46) {
            ev.preventDefault();
            dispatch(DeleteSelected());
            dispatch(SortEveryObjectByZ())
            dispatch(SaveDraft());
          }
        //   undo
          else if (key == 90 && ctrl) {
            ev.preventDefault();
            dispatch(UndoAction());          
        }
      }
    
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown, false)
        return () => {
            window.removeEventListener('keydown', handleKeyDown, false)
        }
    }, [selected, saved])

    function handleBeforeUnload(e) {
        if (draftInfo.statistics.savedToDatabase === false) {
            e.preventDefault();
            e.returnValue = '';
            console.log('prevented')
        }
        console.log('not prevented')
    }

    React.useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [draftInfo.statistics.savedToDatabase])
    

    // function handleScroll(ev) {
    //     ev.preventDefault();
    //     ev.stopPropagation();
    //     ev = ev || window.event;
    //     var key = ev.which || ev.keyCode;
    //     var ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17)
    //         ? true : false);
    //     if (ctrl && ev.deltaY > 0) {
    //         dispatch(ZoomInOutDraft(+zoom - 0.05))
    //         return
    //     }
    //     if (ctrl && ev.deltaY < 0) {
    //         dispatch(ZoomInOutDraft(+zoom + 0.05))
    //         return
    //     }
    // }
    // React.useEffect(() => {
    //     window.addEventListener('mousewheel', handleScroll, false)
    //     return () => {
    //         window.removeEventListener('mousewheel', handleScroll, false)
    //     }
    // }, [zoom])

    const selectedItemStats = getSelectedItemStats(selected)
    const selectedStats = getSelectedStats(selectedItemStats);
    
    const left = selectedStats.leftBound;
    const top = selectedStats.topBound;
    const width = selectedStats.selectedWidth;
    const height = selectedStats.selectedHeight;


    return (
        <div className='canvas' onMouseMove={(event) => {
            if (draftInfo.statistics.move === true) {
                dispatch(MoveSelected([+event.movementX, +event.movementY]))
            }
            else if (draftInfo.statistics.sizeX === true) {
                dispatch(SizeXSelected([+event.movementX, +event.movementY]))
            }
            else if (draftInfo.statistics.sizeY === true) {
                dispatch(SizeYSelected([+event.movementX, +event.movementY]))
            }
            else if (draftInfo.statistics.sizeXY === true) {
                dispatch(SizeXYSelected([+event.movementX, +event.movementY, selectedItemStats, selectedStats]))
            }
        }}
        onMouseUp={(event) => {
            if (event.nativeEvent.which === 3) {
                dispatch(showPopup(['CanvasRightClick', 0]))
                dispatch(getCoordinates([+event.clientX, +event.clientY]))
            }
        }} onWheel={(event) => {
            event.preventDefault();
        }} >
            <div className='draft-cont'>
                <div className='canvas-buffer'></div>
                
                <div id='draft' className='draft' style={{minWidth: `${canvasInfo.width * zoom}mm`, minHeight: `${canvasInfo.height * zoom}mm`, backgroundColor: `rgba(${canvasInfo.fillColor[0]}, ${canvasInfo.fillColor[1]}, ${canvasInfo.fillColor[2]}, ${canvasInfo.fillColor[3]})`,
                    }} >
                    {draftInfo.exporting === false && 
                    <div className='margin' style={{marginTop: `${(canvasInfo.margin[0] - 0.3) * zoom}mm`, marginRight: `${canvasInfo.margin[1]  * zoom}mm`, marginLeft: `${(canvasInfo.margin[3]) * zoom}mm`, minWidth: `${(canvasInfo.width - canvasInfo.margin[1] - canvasInfo.margin[3]) * zoom}mm`, minHeight: `${(canvasInfo.height - canvasInfo.margin[0] - canvasInfo.margin[2]) * zoom}mm`}}></div>
                    }
                    {draftElementsOutput}
                    {selected.length > 0 && <Selected />}
                    {/* <div id='selected' style={{border:"solid rgb(0,160,197) 0.5mm",
                    marginTop: `${(top - 1.5) / +draftInfo.canvasSettings.height * 200}%`, marginLeft: `${(left - 1.5) / +draftInfo.canvasSettings.width * 100}%`, height: `${(height + 2) / +draftInfo.canvasSettings.height * 100}%`, width: `${(width + 2) / +draftInfo.canvasSettings.width * 100}%`,
                    zIndex: '10000001'}}> */}
                        {selected.length > 0 && selectedElementsOutput}
                    {/* </div> */}
                </div>
                
                <div className='canvas-buffer'></div>
                
            </div>
            {popup.CanvasRightClick[0] && selected.length === 0 ? <CanvasRightClick /> : <div></div>}
            <img src='../properties/paste.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/paste-top.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/undo-white.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/copy.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/copy-copy.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/cut.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/cut-top.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/duplicate.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/duplicate-duplicate.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/delete.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/delete-lid.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/bold.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/underlined.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/italic.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/align_horizontal_center.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/align_horizontal_left.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/align_horizontal_right.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/align_vertical_center.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/align_vertical_top.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/align_vertical_bottom.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/format_align_center.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/format_align_left.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/format_align_justify.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/format_align_right.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/move_up.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/move_down.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/horizontal_distribute.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../properties/vertical_distribute.svg' alt='pre-load icon' style={{display: 'none'}} />
        </div>
    )
}