import React from "react";
import './Drop.css';

import { useDispatch } from 'react-redux';
import {
    resetPopups, transition
} from '../../features/popupSlice';

import { useOutsideClick } from "../../Functions";

import { auth, provider, fbProvider } from "../../Firebase";
import { signInWithRedirect, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default function SignIn() {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState({
        email: '',
        password: '',
        emailCorrect: false,
        confirmEmailCorrect: true,
        passwordCorrect: false,
        confirmPasswordCorrect: true,
        canSubmit: false,
        errorMessage: ""
    });

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
        signInWithEmailAndPassword(auth, inputValue.email, inputValue.password).then((cred) => {
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
            if (errorCode === 'auth/invalid-email' || errorCode=== 'auth/user-not-found') {
                setInputValue((state) => ({
                    ...state,
                    errorMessage: "User doesn't exist. Please sign up."
                }))
            } else if (errorCode === 'auth/wrong-password') {
                setInputValue((state) => ({
                    ...state,
                    errorMessage: "Password incorrect. Try again."
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
                <h4>Sign In</h4>
                <form className="popupform-form" onSubmit={handleSubmit}>
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
                        <button to='/dashboard' className="popupform-button popupform-button-right popupform-button-gray" onClick={(event) => {
                            event.preventDefault();
                            signInWithRedirect(auth, provider).then(() => {
                                dispatch(resetPopups());
                            }).catch(() => {
                                setInputValue((state) => ({
                                    ...state,
                                    errorMessage: "An Unexpected Error Occurred. Please try later."
                                }))
                            });
                        }}><img src='../../dashboard/google-logo.svg' />Sign In with Google</button>
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
                        }}><img src='../../dashboard/facebook-logo.svg' />Sign In with Facebook</button>
                    </div> */}
                    <div className="popupform-buttoncont">
                        <button className="popupform-button popupform-button-right" onClick={() => dispatch(resetPopups())}>Cancel</button>
                        {
                            inputValue.canSubmit 
                            &&
                            <input className="popupform-button popupform-button-blue popupform-button-right" style={{marginLeft: '5px'}} type='submit' value='Log In'/>
                        }
                    </div>
                    {inputValue.emailCorrect &&
                    <button style={{color: 'gray', fontSize: '0.9rem', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', margin: '5px 0px'}} onClick={
                        (event) => {
                            event.preventDefault();
                            sendPasswordResetEmail(auth, inputValue.email).then(
                                setInputValue((state) => ({
                                    ...state,
                                    errorMessage: "Password Reset Email Sent"
                                }))
                            ).catch(() => {
                                setInputValue((state) => ({
                                    ...state,
                                    errorMessage: "User not found or an unexpected error."
                                }))
                            })                        
                        }
                    }>Forgot Password</button>
                    }
                    {inputValue.errorMessage !== '' &&
                    <h5 style={{marginTop: '16px', color: 'orange'}}>{inputValue.errorMessage}</h5>
                    }
                </form>
            </div>
        </div>
        
    )
}