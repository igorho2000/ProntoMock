import React from "react";
import '../../pages/dashboardcomps/Drop.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';

import { selectDraft, SaveDraft, AddImage} from "../../features/draftSlice";

import { useOutsideClick } from "../../Functions";
import { storage } from "../../Firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";


export default function ImageUploader() {
    const draftInfo = useSelector(selectDraft);

    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        imagefile: null,
        imageURL: null,
        imageType: null,
        imageSizeExceed: false,
        imageTypeIncorrect: false,
        error: false,
        loading: false,
    })

    function handleChange(event) {
        setInputValue((state) => ({
            ...state,
            imagefile: event.target.files[0],
            imageURL: URL.createObjectURL(event.target.files[0]),
        }))
    }
    function handleDrop(event) {
        if (["image/png", "image/jpeg", "image/svg+xml", "image/svg"].includes(event.dataTransfer.files[0].type) === false) {
            setInputValue((state) => ({
                ...state,
                imagefile: null,
                imageURL: null,
                imageType: null,
                imageSizeExceed: false,
                imageTypeIncorrect: true,
            }))
            return
        }
        if (event.dataTransfer.files[0].size > 2000000) {
            setInputValue((state) => ({
                ...state,
                imagefile: null,
                imageURL: null,
                imageType: null,
                imageSizeExceed: true,
                imageTypeIncorrect: false,
            }))
            return
        }
        const fileType = {
            'image/png': '.png',
            'image/jpeg': '.jpg',
            'image/svg+xml': '.svg',
            'image/svg': '.svg'
        }
        setInputValue((state) => ({
            ...state,
            imagefile: event.dataTransfer.files[0],
            imageURL: URL.createObjectURL(event.dataTransfer.files[0]),
            imageSizeExceed: false,
            imageTypeIncorrect: false,
            error: false,
            imageType: fileType[event.dataTransfer.files[0].type],
        }))
    }
    function handleClick() {
        const imageWidth = +document.querySelector('#uploadedimage').naturalWidth / 3.779528;
        const imageHeight = +document.querySelector('#uploadedimage').naturalHeight / 3.779528;
        const date = new Date()
        const filePath = draftInfo.id + '/' + date.getTime() + inputValue.imageType
        setInputValue((state) => ({
            ...state,
            loading: true
        }))
        uploadBytes(ref(storage, filePath), inputValue.imagefile).then(() => {
            getDownloadURL(ref(storage, filePath)).then((url) => {
                dispatch(AddImage([url, imageWidth, imageHeight]));
                dispatch(SaveDraft());
                dispatch(resetPopups());
            }).catch(() => {
                setInputValue((state) => ({
                    ...state,
                    error: true,
                    loading: false,
                }))
            })
        }).catch(() => {
            setInputValue((state) => ({
                ...state,
                error: true,
                loading: false,
            }))
        })
    }
    
    return (
        <div className="elements" ref={wrapperRef} style={{position: 'fixed', left: '85px', top: '345px', borderRadius: '15px', padding: '7px 5px'}}>
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="imageuploader-cont" style={{backgroundImage: inputValue.imagefile === null ? 'none' : `url(${inputValue.imageURL})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
                    <label htmlFor="imageuploader" className="imageuploader" style={{opacity: inputValue.imagefile === null ? '1' : '0'}} onDragOver={(event) => event.preventDefault} onDragEnter={(event) => event.preventDefault} 
                    onDrop={handleDrop} 
                    >Drop to Upload</label>
                    {inputValue.imageSizeExceed &&
                    <label style={{fontSize: '0.8rem', marginTop: 5, fontWeight: 600, color: 'crimson'}}>File Size Exceeded 2MB</label>}
                    {inputValue.imageTypeIncorrect &&
                    <label style={{fontSize: '0.8rem', marginTop: 5, fontWeight: 600, color: 'crimson'}}>Incorrect File Type</label>}
                    {inputValue.error &&
                    <label style={{fontSize: '0.8rem', marginTop: 5, fontWeight: 600, color: 'crimson'}}>Unexpected Error</label>}
                    {inputValue.loading && <div>
                        <div className='loading-line'></div>
                        <div className='loading-progress'></div>
                    </div>}
                    <div style={{display: inputValue.imageURL === null ? 'none' : 'block'}} >
                        <button onClick={handleClick}>Add Image</button>
                        <button onClick={() => dispatch(resetPopups())}>Cancel</button>
                    </div>
                </div>
                <img id='uploadedimage' src={inputValue.imageURL} style={{display: 'none'}} alt='preview of uploaded document'></img>
                <input id='imageuploader' type='file' style={{display:'none'}} accept="image/png, image/jpeg, .svg, image/svg+xml" onChange={handleChange}></input>
            </form>
        </div>
    )
}