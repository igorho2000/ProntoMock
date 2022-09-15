import React from "react";
import './Home.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function Home() {
    return (
        <div className="Home-container">
            <img className="Home-scene scene1img Home-disappear" src='./Home/scene1.svg' />
            <img className="Home-scene scene2img Home-disappear" src='./Home/scene2.svg' />
            <img className="Home-scene scene3img Home-disappear" src='./Home/scene3.svg' />
            <img className="Home-scene scene4img" src='./Home/scene4.svg' />
            

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
                    <img className="Home-logo" src='./Home/logo.svg' />
                    <div className="Home-title">
                        <h2 className="Home-adj">Pronto</h2>
                        <h3 className="Home-v">MOCK</h3>
                        <Link to="/dashboard" className="Home-button">Start Now</Link>
                    </div>
                </div>
                
               
            </div>
        </div>
        
    )
}

export default Home;