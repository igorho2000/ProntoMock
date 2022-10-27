import React from "react";
import './Home.css';
import {Link, useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from 'react-redux';
import {resetPopups, transition} from '../features/popupSlice';

import {selectUser} from '../features/userSlice'
import {showPopup, selectEveryPopup} from '../features/popupSlice'
import SignIn from "./dashboardcomps/SignIn";
import SignUp from "./dashboardcomps/SignUp";

function Home() {
    const dispatch = useDispatch();
    const everyPopup = useSelector(selectEveryPopup);

    return (
        <div className="Home-container">
            
            <img className="Home-scene scene1img Home-disappear" src='./Home/scene1.svg' alt="home scene 1"/>
            <img className="Home-scene scene2img Home-disappear" src='./Home/scene2.svg' alt="home scene 2"/>
            <img className="Home-scene scene3img Home-disappear" src='./Home/scene3.svg' alt="home scene 3"/>
            <img className="Home-scene scene4img" src='./Home/scene4.svg' alt="home scene 4"/>
            

            <div className="Home-disappear scene1">
                
                <div className="Home-infocont" >
                    <div className="Home-title">
                        <h2 className="Home-adj">Simply</h2>
                        <h3 className="Home-v">EMPATHIZE</h3>
                    </div>
                </div>
                
            </div>
            <div className="Home-disappear scene2">
                
                <div className="Home-infocont" >
                    <div className="Home-title">
                        <h2 className="Home-adj">Easily</h2>
                        <h3 className="Home-v">DEFINE</h3>
                    </div>
                </div>
                
            </div>
            <div className="Home-disappear scene3">
                
                <div className="Home-infocont" >
                    <div className="Home-title" >
                        <h2 className="Home-adj">Creatively</h2>
                        <h3 className="Home-v">IDEATE</h3>
                    </div>
                </div>
                
            </div>
            <div className="scene4">
                
                <div className="Home-infocont">
                    <img className="Home-logo" src='./Home/logo.svg' alt="prontomock logo" />
                    <div className="Home-title">
                        <h2 className="Home-adj">Pronto</h2>
                        <h3 className="Home-v">MOCK</h3>
                    </div>
                    <div className="popupform-buttoncont home-buttoncont">
                        <button className="popupform-button popupform-button-right home-button-left" onClick={() => dispatch(showPopup(['SignIn', 0]))} style={{backgroundColor: 'transparent', boxShadow: 'none', color: 'white'}}>Log In</button>
                        <button className="popupform-button popupform-button-blue home-button-right" onClick={() => dispatch(showPopup(['SignUp', 0]))} style={{ marginRight: '20px'}}>Sign Up</button>
                    </div>
                </div>
                {everyPopup['SignUp'][0] && <SignUp />}
                {everyPopup['SignIn'][0] && <SignIn />}
            </div>
        </div>
        
    )
}

export default Home;