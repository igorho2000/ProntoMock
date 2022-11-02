import React from 'react';
import '../editor.css';
import { useSelector, useDispatch } from 'react-redux';

import {
    ChangeSelectedProperties,
    DeselectObject,
    selectDraft, ToggleExport
} from '../../features/draftSlice';

import * as htmlToImage from 'html-to-image';
import {jsPDF} from 'jspdf';

export default function ControlExport() {

    const dispatch = useDispatch();
    const draft = useSelector(selectDraft);
    const canvasSettings = draft.canvasSettings;
    const zoom = +draft.statistics.zoom;

    const [inputValue, setInputValue] = React.useState({
        fileName: canvasSettings.name,
        fileType: 'PDF',
        downloading: false,
        error: false
    })

    React.useEffect(() => {
        setInputValue((state) => ({
            ...state,
            fileName: canvasSettings.name,
        }))
    }, [canvasSettings])

    function handleSubmit(event) {
        event.preventDefault();
    }
    function handleKeyUp(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    }
    function handleChange(event) {
        setInputValue((state) => (
            {...state,
            [event.target.id]: event.target.value}
        ))
    }
    function handleSelectChange(event) {
        setInputValue((state) => (
            {...state,
            [event.target.id]: event.target.value}
        ))
        dispatch(ChangeSelectedProperties([event.target.id, event.target.value]))
    }

    function savepng() {
        setInputValue((state) => ({
            ...state,
            downloading: true,
            error: false,
        }))
        htmlToImage.toPng(document.querySelector('#draft'), {width: +canvasSettings.width * 3.7795276 * zoom, height: +canvasSettings.height * 3.7795276 * zoom, canvasWidth: +canvasSettings.width * 20, canvasHeight: +canvasSettings.height * 20}).then(
            function (dataUrl) {
                var element = document.createElement('a');
                element.setAttribute('href', dataUrl);
                element.setAttribute('download',`${inputValue.fileName}.png`);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                setInputValue((state) => ({
                    ...state,
                    downloading: false,
                }))
            }
        ).catch(() => {
            setInputValue((state) => ({
                ...state,
                downloading: false,
                error: true,
            }))
        })
    }

    // function savesvg() {
    //     htmlToImage.toSvg(document.querySelector('#draft')).then(
    //         function (dataUrl) {
    //             var element = document.createElement('a');
    //             element.setAttribute('href', dataUrl);
    //             element.setAttribute('download', 'my image');
    //             element.style.display = 'none';
    //             document.body.appendChild(element);
    //             element.click();
    //             document.body.removeChild(element);
    //         }
    //     )
    // }
        
    function savejpg() {
        setInputValue((state) => ({
            ...state,
            downloading: true,
            error: false,
        }))
        htmlToImage.toJpeg(document.querySelector('#draft'), {width: +canvasSettings.width * 3.7795276 * zoom, height: +canvasSettings.height * 3.7795276 * zoom, canvasWidth: +canvasSettings.width * 20, canvasHeight: +canvasSettings.height * 20}).then(
            function (dataUrl) {
                var element = document.createElement('a');
                element.setAttribute('href', dataUrl);
                element.setAttribute('download', `${inputValue.fileName}.jpg`);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                setInputValue((state) => ({
                    ...state,
                    downloading: false,
                }))
            }
        ).catch(() => {
            setInputValue((state) => ({
                ...state,
                downloading: false,
                error: true,
            }))
        })
    }
    
    function savepdf() {
        setInputValue((state) => ({
            ...state,
            downloading: true,
            error: false,
        }))
        htmlToImage.toPng(document.querySelector('#draft'), {width: +canvasSettings.width * 3.7795276 * zoom, height: +canvasSettings.height * 3.7795276 * zoom, canvasWidth: +canvasSettings.width * 20, canvasHeight: +canvasSettings.height * 20}).then(
            function (dataUrl) {
                var pdf = new jsPDF(+canvasSettings.width > +canvasSettings.height ? 'h' : 'p', 'mm', [+canvasSettings.width, +canvasSettings.height]);
                pdf.addImage(dataUrl, 'PNG', 0, 0, +canvasSettings.width, +canvasSettings.height, '', 'FAST');
                pdf.save(inputValue.fileName);
                setInputValue((state) => ({
                    ...state,
                    downloading: false,
                }))
            }
        ).catch(() => {
            setInputValue((state) => ({
                ...state,
                downloading: false,
                error: true,
            }))
        })
    }

    return (
        <div className='control-title'>
            <div>
                <h4 className='control-group-title'>Export</h4>
            </div>
            <div className='control-group'>
                <form  className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp} >
                    <label>Format</label>
                    <select id='fileType' onChange={handleSelectChange} value={inputValue.fileType}>
                        <option>PDF</option>
                        <option>PNG</option>
                        <option>JPG</option>
                        {/* <option>SVG</option> */}
                    </select>
                </form>
                <form className='control-form-long' onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                    <label>Name</label>
                    <input id='fileName' style={{width: "12rem"}} type="text" value={inputValue.fileName} onChange={handleChange} />
                </form>
                {inputValue.fileType === 'PDF' &&
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <button onClick={() => {
                        dispatch(DeselectObject());
                        dispatch(ToggleExport(true));
                        setTimeout(() => {
                            savepdf();
                        }, 100);
                        setTimeout(() => {
                            dispatch(ToggleExport(false));
                        }, 120)
                    }} >Download PDF File</button>
                    <div className='control-loading-circle' style={{display: inputValue.downloading ? 'block' : 'none'}}></div>
                </div>
                }
                {inputValue.fileType === 'PNG' &&
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <button onClick={() => {
                        dispatch(DeselectObject());
                        dispatch(ToggleExport(true));
                        setTimeout(() => {
                            savepng();
                        }, 100);
                        setTimeout(() => {
                            dispatch(ToggleExport(false));
                        }, 120)
                    }} >Download PNG File</button>
                    <div className='control-loading-circle' style={{display: inputValue.downloading ? 'block' : 'none'}}></div>
                </div>
                }
                {inputValue.fileType === 'JPG' &&
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <button onClick={() => {
                        dispatch(DeselectObject());
                        dispatch(ToggleExport(true));
                        setTimeout(() => {
                            savejpg();
                        }, 100);
                        setTimeout(() => {
                            dispatch(ToggleExport(false));
                        }, 120)
                    }} >Download JPG File</button>
                    <div className='control-loading-circle' style={{display: inputValue.downloading ? 'block' : 'none'}}></div>
                </div>
                }
                { inputValue.error &&
                <p style={{fontSize: '0.8rem', marginTop: '0.7rem', fontWeight: 600, color: 'crimson'}}>Unexpected Error</p>
                }
                {/* {inputValue.fileType === 'SVG' &&
                <button onClick={() => {
                    dispatch(DeselectObject());
                    dispatch(ToggleExport(true));
                    setTimeout(() => {
                        savesvg();
                    }, 100);
                    setTimeout(() => {
                        dispatch(ToggleExport(false));
                    }, 120)
                }} >Download SVG File</button>
                } */}
            </div>
        </div>
    )
}