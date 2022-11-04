import React from 'react';
import './editor.css';
import { useSelector, useDispatch } from 'react-redux';

import { SaveDraft, selectDraft, UndoAction, ZoomInOutDraft, AddObject, DeselectObject, SaveToDatabase } from '../features/draftSlice';
import ImageUploader from './canvascomps/ImageUploader';

import { selectEveryPopup, showPopup } from '../features/popupSlice';
import IconAdder from './canvascomps/IconAdder';

import { selectCurrentProject, selectEveryProject } from '../features/projectSlice';

import { db } from '../Firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import { updateDraftThumbnail } from '../features/projectSlice';

export default function Elements() {
    const dispatch = useDispatch();
    const draftInfo = useSelector(selectDraft);
    const selected = draftInfo.selected;
    const saved = draftInfo.saved;
    const statistics = draftInfo.statistics;
    const popup = useSelector(selectEveryPopup);
    const currentProject = useSelector(selectCurrentProject);
    const everyProject = useSelector(selectEveryProject);

    const [zoom, setZoom] = React.useState(Math.round(draftInfo.statistics.zoom * 100));
    const [saving, setSaving] = React.useState(false);

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
    function handleSave() {
        dispatch(DeselectObject());
        dispatch(SaveToDatabase());
        setSaving(true)
        setDoc(doc(db, 'draft', draftInfo.id), {
            id: draftInfo.id,
            canvasSettings: draftInfo.canvasSettings,
            everyObject: draftInfo.everyObject.concat(draftInfo.selectedObject)
        }).then(() => {
            html2canvas(document.querySelector('#draft'), {useCORS: true}).then(
                (canvas) => {
                    const resolution = (+draftInfo.statistics.zoom * 30) / +draftInfo.canvasSettings.height;
                    const imageURI = canvas.toDataURL("image/jpeg", resolution);
                    const projectID = draftInfo.project[0] === 'currentProject' ? currentProject[0].id.replace(' ', '') : everyProject[draftInfo.project[1]].id.replace(' ', '');
                    dispatch(updateDraftThumbnail([draftInfo.project, imageURI]))
                    var draftsToUpdate = draftInfo.project[0] === 'currentProject' ? [...currentProject[0][draftInfo.project[2]]] : [...everyProject[draftInfo.project[1]][draftInfo.project[2]]];
                    draftsToUpdate[draftInfo.project[3]] = {
                        ...draftsToUpdate[draftInfo.project[3]],
                        image: imageURI
                    };
                    updateDoc(doc(db, 'projects', projectID), {
                        [draftInfo.project[2]]: draftsToUpdate
                    })
                    setSaving(false)
                }).catch(() => {
                    setSaving(false)
                })
        }).catch(() => {
            setSaving(false)
        })
    }
    function handleKeyDown(ev) {
        ev = ev || window.event;
          var key = ev.which || ev.keyCode;
          var ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17)
              ? true : false);
        //   ctrl S
          if (key === 83 && ctrl) {
            ev.preventDefault();
            handleSave();
          }
      }
    
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown, false)
        return () => {
            window.removeEventListener('keydown', handleKeyDown, false)
        }
    }, [selected, saved])

    return (
        <div>
            <div className='elements'>
                <div className='elements-function' onClick={() => {
                    dispatch(AddObject(0));
                    dispatch(SaveDraft());
                }}>
                    <img className='elements-icon' src="../properties/text.svg" alt='add text' />
                    <img className='elements-add-circle' src="../properties/add-circle.svg" alt='plus sign decoration icon'/>
                    <div className='elements-description'>Text</div>
                </div>
                <div className='elements-function' onClick={() => {
                    dispatch(AddObject(1));
                    dispatch(SaveDraft());
                }}>
                    <img className='elements-icon' src="../properties/rectangle.svg" alt='add rectangle'/>
                    <img className='elements-add-circle' src="../properties/add-circle.svg" alt='plus sign decoration icon'/>
                    <div className='elements-description'>Rectangle</div>
                </div>
                <div className='elements-function' onClick={() => {
                    dispatch(AddObject(2));
                    dispatch(SaveDraft());
                }}>
                    <img className='elements-icon' src="../properties/ellipse.svg" alt='add ellipse'/>
                    <img className='elements-add-circle' src="../properties/add-circle.svg" alt='plus sign decoration icon'/>
                    <div className='elements-description'>Ellipse</div>
                </div>
                <div className='elements-function' onClick={() => {
                    dispatch(AddObject(3));
                    dispatch(SaveDraft());
                }}>
                    <img className='elements-icon' src="../properties/line.svg" alt='add line'/>
                    <img className='elements-add-circle' src="../properties/add-circle.svg" alt='plus sign decoration icon'/>
                    <div className='elements-description'>Line</div>
                </div>
                <div className='elements-function' onClick={() => dispatch(showPopup(['ImageUploader', 0]))}>
                    <img className='elements-icon' src="../properties/image.svg" alt='add file'/>
                    <img className='elements-add-circle' src="../properties/add-circle.svg" alt='plus sign decoration icon'/>
                    <div className='elements-description'>Image</div>
                </div>
                <div className='elements-function' onClick={() => dispatch(showPopup(['IconAdder', 0]))}>
                    <img className='elements-icon' src="../properties/icon.svg" alt='add icon'/>
                    <img className='elements-add-circle' src="../properties/add-circle.svg" alt='plus sign decoration icon'/>
                    <div className='elements-description'>Icon</div>
                </div>
            </div>
            <div className='elements elements-control'>
                <div className='elements-function' onClick={handleSave}>
                    <img className='elements-icon elements-control-icon' src="../properties/save.svg" alt='save draft' />
                    <div className='elements-description'>Save</div>
                    {statistics.savedToDatabase === false && <div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: 'crimson', position: 'absolute', transform: 'translate3d(8px, -8px, 0)'}}></div>}
                    {saving && <div className='control-loading-circle' style={{position: 'absolute', width: 0, height: 0, transform: 'translate3d(8px, -8px, 0)', margin: 0, borderWidth: 15}}></div>}
                </div>
                <div className='elements-function' onClick={() => dispatch(UndoAction())}>
                    <img className='elements-icon elements-control-icon' src="../properties/undo.svg" alt='undo action' />
                    <div className='elements-description'>Undo</div>
                </div>
                <div className='elements-function' onClick={() => dispatch(ZoomInOutDraft(+zoom / 100 + 0.05))}>
                    <img className='elements-icon elements-control-icon' src="../properties/zoom_in.svg" alt='zoom in' />
                    <div className='elements-description'>Zoom In</div>
                </div>
                <form onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                    <input value={zoom} onChange={handleChange} onBlur={handleBlur} />
                    <label style={{fontSize: '0.9rem'}}>%</label>
                </form>
                <div className='elements-function' onClick={() => dispatch(ZoomInOutDraft(+zoom / 100 - 0.05))}>
                    <img className='elements-icon elements-control-icon' src="../properties/zoom_out.svg" alt='zoom out' />
                    <div className='elements-description'>Zoom Out</div>
                </div>
            </div>
            {popup.ImageUploader[0] && <ImageUploader />}
            {popup.IconAdder[0] && <IconAdder />}
        </div>
        
    )
}