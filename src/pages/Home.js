import React from "react";
import './Home.css';

function Home() {
    return (
        <div className="Home-container">
            <div className="Home-disappear scene1">
                <img className="Home-scene" src='./Home/scene1.svg' />
                <div className="Home-infocont" >
                    <div className="Home-title">
                        <h2 className="Home-adj">Simply</h2>
                        <h3 className="Home-v">EMPATHIZE</h3>
                    </div>
                </div>
                
            </div>
            <div className="Home-disappear scene2">
                <img className="Home-scene" src='./Home/scene2.svg' />
                <div className="Home-infocont" >
                    <div className="Home-title">
                        <h2 className="Home-adj">Easily</h2>
                        <h3 className="Home-v">DEFINE</h3>
                    </div>
                </div>
                
            </div>
            <div className="Home-disappear scene3">
                <img className="Home-scene" src='./Home/scene3.svg' />
                <div className="Home-infocont" >
                    <div className="Home-title" >
                        <h2 className="Home-adj">Creatively</h2>
                        <h3 className="Home-v">IDEATE</h3>
                    </div>
                </div>
                
            </div>
            <div className="scene4">
                <img className="Home-scene" src='./Home/scene4.svg' />
                <div className="Home-infocont">
                    <img className="Home-logo" src='./Home/logo.svg' />
                    <div className="Home-title">
                        <h2 className="Home-adj">Pronto</h2>
                        <h3 className="Home-v">MOCK</h3>
                        <div className="Home-button">Start Now</div>
                    </div>
                </div>
                
               
            </div>
        </div>
        
    )
}

export default Home;