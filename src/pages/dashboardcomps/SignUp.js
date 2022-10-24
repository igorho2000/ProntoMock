import React from "react";
import './Drop.css';

import { useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';

import { useOutsideClick } from "../../Functions";
import { handleSignUp, handleSignInGoogle } from "../../Firebase";

export default function SignUp() {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        email: '',
        password: '',
        emailCorrect: true,
        passwordCorrect: true,
        canSubmit: false,
    });

    function handleEmailChange(event) {
        setInputValue((state) => ({
            ...state,
            email: event.target.value,
        }));
        if (event.target.value.includes('@') === false || event.target.value.includes('.') === false || event.target.value[0] === '@' || event.target.value[event.target.value.length - 1] === '@') {
            setInputValue((state) => ({
                ...state,
                emailCorrect: false,
                canSubmit: false,
            }));
            return
        }
        setInputValue((state) => ({
            ...state,
            emailCorrect: true,
        }));
        if (inputValue.passwordCorrect === true) {
            setInputValue((state) => ({
                ...state,
                canSubmit: true,
            }));
        }
    }
    function handlePasswordChange(event) {
        setInputValue((state) => ({
            ...state,
            password: event.target.value,
        }));
        if (event.target.value.length < 6 ) {
            setInputValue((state) => ({
                ...state,
                passwordCorrect: false,
                canSubmit: false,
            }));
            return
        }
        setInputValue((state) => ({
            ...state,
            passwordCorrect: true,
        }));
        if (inputValue.emailCorrect === true) {
            setInputValue((state) => ({
                ...state,
                canSubmit: true,
            }));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleSignUp(inputValue.email, inputValue.password);
        dispatch(resetPopups());
    }

    return (
        <div className="draftrename account-signinup" ref={wrapperRef} style={{padding: '15px 20px'}} >
            <h4 className="draftrename-title">Sign Up</h4>
            
            <form className="newdraft-form" onSubmit={handleSubmit}>
                <div style={{display: 'flex', alignItems:'baseline'}} >
                    <h5 className="projectsettings-section">Email</h5>
                    {
                        inputValue.emailCorrect === false
                        &&
                        <p style={{color: 'maroon', marginLeft: '10px', fontSize: '0.9rem', fontWeight: '600'}} >Format Incorrect</p>
                    }
                </div>
                <input className="draftrename-input newdraft-input"  style={{marginBottom: '5px'}} type="email" value={inputValue.email} onChange={handleEmailChange} />
                <div style={{display: 'flex', alignItems:'baseline'}} >
                    <h5 className="projectsettings-section">Password</h5>
                    {
                        inputValue.passwordCorrect === false
                        &&
                        <p style={{color: 'maroon', marginLeft: '10px', fontSize: '0.9rem', fontWeight: '600'}} >Less than 6 characters</p>
                    }
                </div>
                <input className="draftrename-input newdraft-input" type="password" value={inputValue.password} onChange={handlePasswordChange} />
                <div className="draftrename-buttoncont" style={{marginBottom: '5px'}} >
                    <button className="draftrename-submit" onClick={() => {
                        handleSignInGoogle();
                        dispatch(resetPopups());
                    }}>Sign In with Google</button>
                </div>
                <div className="draftrename-buttoncont">
                    <button className="draftrename-cancel" onClick={() => dispatch(resetPopups())}>Cancel</button>
                    {
                        inputValue.canSubmit 
                        &&
                        <input className="draftrename-submit" type='submit' value='Create Account'/>
                    }
                </div>
            </form>
        </div>
    )
}