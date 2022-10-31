import React from "react";
import './Drop.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetPopups
} from '../../features/popupSlice';
import { selectUser, changeUserProperties } from "../../features/userSlice";
import { useOutsideClick } from "../../Functions";

import { auth } from "../../Firebase";
import { updateProfile } from "firebase/auth";

export default function UserSettings() {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        username: user.name,
        email: user.email
    });
    function handleChange(event) {
        setInputValue((state) => ({
            ...state,
            [event.target.id]: event.target.value
        }))
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        updateProfile(auth.currentUser, {
            displayName: inputValue.username
        })
        dispatch(changeUserProperties(['name', inputValue.username]))
        dispatch(resetPopups());
    }

    return (
        <div className="popupform-positioner">
            <div className="popupform" ref={wrapperRef} >
                <h4>Account Settings</h4>
                <form className="popupform-form" onSubmit={handleSubmit}>
                    <div className="popupform-input" >
                        <label>Username</label>
                        <input id='username' type="text" value={inputValue.username} onChange={handleChange} />
                    </div>
                    <div className="popupform-input" >
                        <label>Email</label>
                        <input id='email' type="text" value={inputValue.email} disabled />
                    </div>
                    <div className="popupform-buttoncont">
                        <button className="popupform-button popupform-button-right" onClick={() => dispatch(resetPopups())}>Cancel</button>
                        {inputValue.name !== '' && <input className="popupform-button popupform-button-blue popupform-button-right" style={{marginLeft: '5px'}} type='submit' value='Save Changes'/>}
                    </div>
                </form>
            </div>
        </div>
        
    )
}