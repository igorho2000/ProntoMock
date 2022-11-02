import React from "react";
import './Drop.css';

import { useDispatch } from 'react-redux';
import {
    resetPopups, transition
} from '../../features/popupSlice';

import { useOutsideClick } from "../../Functions";

import { auth, provider } from "../../Firebase";
import { signInWithRedirect, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignUp() {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        name: '',
        email: '',
        password: '',
        emailCorrect: false,
        confirmEmailCorrect: true,
        passwordCorrect: false,
        confirmPasswordCorrect: true,
        canSubmit: false,
        errorMessage: ''
    });
    function handleNameChange(event) {
        setInputValue((state) => ({
            ...state,
            name: event.target.value
        }))
    }
    function handleEmailChange(event) {
        setInputValue((state) => ({
            ...state,
            email: event.target.value,
        }));
        if (event.target.value.includes('@') === false || event.target.value[0] === '@' || event.target.value[event.target.value.length - 1] === '@') {
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
            confirmEmailCorrect: true,
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
            confirmPasswordCorrect: true,
        }));
        if (inputValue.emailCorrect === true) {
            setInputValue((state) => ({
                ...state,
                canSubmit: true,
            }));
        }
    }
    function handleEmailBlur() {
        if (inputValue.emailCorrect) {
            setInputValue((state) => ({
                ...state,
                confirmEmailCorrect: true
            }))
            return
        }
        setInputValue((state) => ({
            ...state,
            confirmEmailCorrect: false
        }))
    }
    function handlePasswordBlur() {
        if (inputValue.passwordCorrect) {
            setInputValue((state) => ({
                ...state,
                confirmPasswordCorrect: true
            }))
            return
        }
        setInputValue((state) => ({
            ...state,
            confirmPasswordCorrect: false
        }))
    }
    function handleSubmit(event) {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, inputValue.email, inputValue.password).then((cred) => {
            updateProfile(cred.user, {
                displayName: inputValue.name
            }).then(() => {console.log('success')})
            dispatch(resetPopups());
            dispatch(transition())
            setTimeout(() => {
                dispatch(resetPopups())
            }, 3000)
        }).catch((error) => {
            const errorCode = error.code;
            setInputValue((state) => ({
                ...state,
                email: '',
                password: '',
                emailCorrect: false,
                confirmEmailCorrect: true,
                passwordCorrect: false,
                confirmPasswordCorrect: true,
                canSubmit: false,
            }))
            if (errorCode === 'auth/email-already-in-use' || errorCode=== 'auth/account-exists-with-different-credential') {
                setInputValue((state) => ({
                    ...state,
                    errorMessage: 'Email has been registered.'
                }))
            } else if (errorCode === 'auth/invalid-email') {
                setInputValue((state) => ({
                    ...state,
                    errorMessage: "Email doesn't exist, try another."
                }))
            } else {
                setInputValue((state) => ({
                    ...state,
                    errorMessage: "An Unexpected Error Occurred. Please try later."
                }))
            }
        })
    }

    return (
        <div className="popupform-positioner">
            <div className="popupform" ref={wrapperRef} >
                <h4>Sign Up</h4>
                <form className="popupform-form" onSubmit={handleSubmit}>
                    <div className="popupform-input" >
                        <label>Full Name</label>
                        <input className="popupform-input-border" type="text" value={inputValue.name} onChange={handleNameChange} />
                    </div>
                    <div className="popupform-input" >
                        <label>Email</label>
                        <input className="popupform-input-border" type="email" value={inputValue.email} onChange={handleEmailChange} onBlur={handleEmailBlur} />
                    </div>
                    <div className="popupform-notice" >
                        {
                            inputValue.confirmEmailCorrect === false
                            &&
                            <p style={{color: 'maroon', fontSize: '0.9rem', fontWeight: '600'}} >Format Incorrect</p>
                        }
                    </div>
                    <div className="popupform-input" >
                        <label>Password</label>
                        <input className="popupform-input-border" type="password" value={inputValue.password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} />
                    </div>
                    <div className="popupform-notice" >
                        {
                            inputValue.confirmPasswordCorrect === false
                            &&
                            <p style={{color: 'maroon', fontSize: '0.9rem', fontWeight: '600'}} >Less than 6 characters</p>
                        }
                    </div>
                    <div className="popupform-buttoncont" style={{marginTop: '16px'}}>
                        <button className="popupform-button popupform-button-right popupform-button-gray" onClick={(event) => {
                            event.preventDefault();
                            signInWithRedirect(auth, provider).then(() => {
                                dispatch(resetPopups());
                            }).catch(() => {
                                setInputValue((state) => ({
                                    ...state,
                                    errorMessage: "An Unexpected Error Occurred. Please try later."
                                }))
                            });
                        }}><img src='../../dashboard/google-logo.svg' alt='Google Logo' />Sign Up with Google</button>
                    </div>
                    {/* <div className="popupform-buttoncont">
                        <button to='/dashboard' className="popupform-button popupform-button-right popupform-button-gray" onClick={(event) => {
                            event.preventDefault();
                            signInWithRedirect(auth, fbProvider).then(() => {
                                dispatch(resetPopups());
                            }).catch(() => {
                                setInputValue((state) => ({
                                    ...state,
                                    errorMessage: "An Unexpected Error Occurred. Please try later."
                                }))
                            });
                        }}><img src='../../dashboard/facebook-logo.svg' />Sign Up with Facebook</button>
                    </div> */}
                    <div className="popupform-buttoncont">
                        <button className="popupform-button popupform-button-right" onClick={() => dispatch(resetPopups())}>Cancel</button>
                        {
                            (inputValue.canSubmit && inputValue.name !== '')
                            &&
                            <input className="popupform-button popupform-button-blue popupform-button-right" style={{marginLeft: '5px'}} type='submit' value='Sign Up'/>
                        }
                    </div>
                </form>
                {inputValue.errorMessage !== '' &&
                    <h5 style={{marginTop: '16px', color: 'orange'}}>{inputValue.errorMessage}</h5>
                }
            </div>
        </div>
        
    )
}