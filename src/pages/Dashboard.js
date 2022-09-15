import React from "react";
import './Dashboard.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";


export default function Dashboard() {
    return (
        <div>
            <div>
                <div className="dashboard-header-top">
                    <Link to="/" className="dashboard-logo-cont">
                        <img src="../dashboard/logo.svg" className="dashboard-logo" />
                        <div className="dashboard-prontomock">
                            <h2 className="dashboard-pronto">Pronto</h2>
                            <h2 className="dashboard-mock">MOCK</h2>
                        </div>
                        
                    </Link>
                    <div className="dashboard-account-cont">
                        <div className="dashboard-account-icon">WW</div>
                        <img className="dashboard-account-expand" src="../dashboard/expand.svg" />
                    </div>
                </div>
                <div className="dashboard-header-bottom">

                </div>
            </div>
        </div>
    )
}