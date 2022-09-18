import React from 'react';
import '../Dashboard.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import DraftDrop from './DraftDrop';

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups, showPopup,
    selectEveryPopup,
} from '../../features/popupSlice';
import {
    switchProject,
    selectEveryProject, selectCurrentProject,
} from '../../features/projectSlice';

export default function DraftInfo(props) {
    
    const dispatch = useDispatch();
    const everyPopup = useSelector(selectEveryPopup);

    return (
        <div className="dashboard-draft">
            <div className="dashboard-draft-cont">
                <div className="dashboard-draft-title">
                    <h4 className="dashboard-draft-name">{props.name}</h4>
                    <h5 className="dashboard-draft-type">{props.type}</h5>
                    <h6 className="dashboard-draft-date">{`Last Updated: ${props.date}`}</h6>
                </div>
                <div className='dashboard-draft-settings'>
                    <img className="dashboard-draft-more" src="../dashboard/more.svg" 
                    onClick={() => 
                        dispatch(showPopup(['DraftDrop', props.index]))
                    }/>
                    {everyPopup.DraftDrop[props.index] && <DraftDrop index={props.index} />}
                </div>
            </div>
            <img className="dashboard-draft-img" src="../dashboard/ex1.png" />
        </div>
    )
}