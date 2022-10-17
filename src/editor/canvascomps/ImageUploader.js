import React from "react";
import '../../pages/dashboardcomps/Drop.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetPopups, selectEveryPopup
} from '../../features/popupSlice';

import { selectDraft, SaveDraft, AddImage} from "../../features/draftSlice";

import { useOutsideClick } from "../../Functions";


export default function ImageUploader() {

    const popup = useSelector(selectEveryPopup);
    const draftInfo = useSelector(selectDraft);
    const selected = draftInfo.selectedObject;
    const canvasSettings = draftInfo.canvasSettings;
    const zoom = draftInfo.statistics.zoom;

    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        imagefile: null,
        imageURL: null,
    })

    function handleChange(event) {
        setInputValue({
            imagefile: event.target.files[0],
            imageURL: URL.createObjectURL(event.target.files[0]),
        })
    }
    function handleDrop(event) {
        if (["image/png", "image/jpeg", "image/svg+xml", "image/svg"].includes(event.dataTransfer.files[0].type) === false) {
            console.log(event.dataTransfer.files[0].type)
            return
        }
        setInputValue({
            imagefile: event.dataTransfer.files[0],
            imageURL: URL.createObjectURL(event.dataTransfer.files[0]),
        })

    }
    function handleClick() {
        const imageWidth = +document.querySelector('#uploadedimage').naturalWidth / 3.779528;
        const imageHeight = +document.querySelector('#uploadedimage').naturalHeight / 3.779528;
        console.log(inputValue.imageURL)
        dispatch(AddImage([inputValue.imageURL, imageWidth, imageHeight]));
        dispatch(SaveDraft());
        dispatch(resetPopups());
    }
    
    return (
        <div className="elements" ref={wrapperRef} style={{position: 'fixed', left: '90px', top: '380px', borderRadius: '15px', padding: '7px 5px'}}>
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="imageuploader-cont" style={{backgroundImage: inputValue.imagefile === null ? 'none' : `url(${inputValue.imageURL})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
                    <label htmlFor="imageuploader" className="imageuploader" style={{opacity: inputValue.imagefile === null ? '1' : '0'}} onDragOver={(event) => event.preventDefault} onDragEnter={(event) => event.preventDefault} 
                    onDrop={handleDrop} 
                    >Drop to Upload</label>
                    <div style={{display: inputValue.imageURL === null ? 'none' : 'block'}} >
                        <button onClick={handleClick}>Add Image</button>
                        <button onClick={() => dispatch(resetPopups())}>Cancel</button>
                    </div>
                </div>
                <img id='uploadedimage' src={inputValue.imageURL} style={{display: 'none'}}></img>
                <input id='imageuploader' type='file' style={{display:'none'}} accept="image/png, image/jpeg, .svg, image/svg+xml" onChange={handleChange}></input>
            </form>
        </div>
    )
}