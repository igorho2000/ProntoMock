import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import { SaveDraft, selectDraft, UndoAction, ZoomInOutDraft, AddObject, DeselectObject, SaveToDatabase } from '../features/draftSlice';
import ImageUploader from './canvascomps/ImageUploader';

import { selectEveryPopup, showPopup } from '../features/popupSlice';
import IconAdder from './canvascomps/IconAdder';

import { db } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Elements() {
    const dispatch = useDispatch();
    const draftInfo = useSelector(selectDraft);
    const statistics = draftInfo.statistics;
    const popup = useSelector(selectEveryPopup);

    const [zoom, setZoom] = React.useState(Math.round(draftInfo.statistics.zoom * 100));

    React.useEffect(() => {
        setZoom(Math.round(draftInfo.statistics.zoom * 100))
    }, [draftInfo.statistics.zoom])

    function handleSubmit(event) {
        event.preventDefault();
    }
    function handleChange(event) {
        setZoom(event.target.value);
    }
    function handleBlur(event) {
        if (+event.target.value < 10 || +event.target.value > 300 ) {
            setZoom(Math.round(draftInfo.statistics.zoom * 100))
            return
        }
        dispatch(ZoomInOutDraft(+event.target.value / 100));
    }
    function handleKeyUp(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    }

    return (
        <div>
            <div className='elements'>
                <div className='elements-function' onClick={() => {
                    dispatch(AddObject(0));
                    dispatch(SaveDraft());
                }}>
                    <img className='elements-icon' src="../properties/text.svg" />
                    <img className='elements-add-circle' src="../properties/add-circle.svg" />
                    <div className='elements-description'>Text</div>
                </div>
                <div className='elements-function' onClick={() => {
                    dispatch(AddObject(1));
                    dispatch(SaveDraft());
                }}>
                    <img className='elements-icon' src="../properties/rectangle.svg" />
                    <img className='elements-add-circle' src="../properties/add-circle.svg" />
                    <div className='elements-description'>Rectangle</div>
                </div>
                <div className='elements-function' onClick={() => {
                    dispatch(AddObject(2));
                    dispatch(SaveDraft());
                }}>
                    <img className='elements-icon' src="../properties/ellipse.svg" />
                    <img className='elements-add-circle' src="../properties/add-circle.svg" />
                    <div className='elements-description'>Ellipse</div>
                </div>
                <div className='elements-function' onClick={() => {
                    dispatch(AddObject(3));
                    dispatch(SaveDraft());
                }}>
                    <img className='elements-icon' src="../properties/line.svg" />
                    <img className='elements-add-circle' src="../properties/add-circle.svg" />
                    <div className='elements-description'>Line</div>
                </div>
                <div className='elements-function' onClick={() => dispatch(showPopup(['ImageUploader', 0]))}>
                    <img className='elements-icon' src="../properties/image.svg" />
                    <img className='elements-add-circle' src="../properties/add-circle.svg" />
                    <div className='elements-description'>Image</div>
                </div>
                <div className='elements-function' onClick={() => dispatch(showPopup(['IconAdder', 0]))}>
                    <img className='elements-icon' src="../properties/icon.svg" />
                    <img className='elements-add-circle' src="../properties/add-circle.svg" />
                    <div className='elements-description'>Icon</div>
                </div>
            </div>
            <div className='elements elements-control'>
                <div className='elements-function' onClick={() => {
                    dispatch(DeselectObject());
                    dispatch(SaveToDatabase());
                    setDoc(doc(db, 'draft', draftInfo.id), {
                        id: draftInfo.id,
                        canvasSettings: draftInfo.canvasSettings,
                        everyObject: draftInfo.everyObject.concat(draftInfo.selectedObject)
                    })
                    
                }}>
                    <img className='elements-icon elements-control-icon' src="../properties/save.svg" />
                    <div className='elements-description'>Save</div>
                    {statistics.savedToDatabase === false && <div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: 'crimson', position: 'absolute', transform: 'translate3d(8px, -8px, 0)'}}></div>}
                </div>
                <div className='elements-function' onClick={() => dispatch(UndoAction())}>
                    <img className='elements-icon elements-control-icon' src="../properties/undo.svg" />
                    <div className='elements-description'>Undo</div>
                </div>
                <div className='elements-function' onClick={() => dispatch(ZoomInOutDraft(+zoom / 100 + 0.05))}>
                    <img className='elements-icon elements-control-icon' src="../properties/zoom_in.svg" />
                    <div className='elements-description'>Zoom In</div>
                </div>
                <form onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                    <input value={zoom} onChange={handleChange} onBlur={handleBlur} />
                    <label style={{fontSize: '0.9rem'}}>%</label>
                </form>
                <div className='elements-function' onClick={() => dispatch(ZoomInOutDraft(+zoom / 100 - 0.05))}>
                    <img className='elements-icon elements-control-icon' src="../properties/zoom_out.svg" />
                    <div className='elements-description'>Zoom Out</div>
                </div>
            </div>
            {popup.ImageUploader[0] && <ImageUploader />}
            {popup.IconAdder[0] && <IconAdder />}
        </div>
        
    )
}