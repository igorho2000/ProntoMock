import React from "react";
import './Dashboard.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    selectCurrentProject,
} from '../features/projectSlice';

import {
    showPopup,
    selectEveryPopup,
} from '../features/popupSlice';

import Header from './Header';
import DraftInfo from "./dashboardcomps/DraftInfo";
import NewDraft from "./dashboardcomps/NewDraft";
import ProjectSettings from "./dashboardcomps/ProjectSettings"; 
import NewProject from "./dashboardcomps/NewProject";
import ProjectDrop from "./dashboardcomps/ProjectDrop";

export default function Dashboard() {
    const dispatch = useDispatch();
    const everyPopup = useSelector(selectEveryPopup);
    const currentProject = useSelector(selectCurrentProject);

    const outputProjectDraft = currentProject[0].drafts.map((item, index) => (
        <DraftInfo name={item.name} type={item.type} date={item.date} key={`draft${index}`} index={index} star={false} />
    ))
    const outputStarredProjectDraft = currentProject[0].starredDrafts.map((item, index) => (
        <DraftInfo name={item.name} type={item.type} date={item.date} key={`stardraft${index}`} index={index} star={true} />
    ))

    return (
        <div>
            <Header />
            <div className="dashboard-header-bottom">
                    <div className="dashboard-project-cont">
                        <div className="dashboard-project-title" onClick={() => dispatch(showPopup(['ProjectDrop', 0]))}>
                            <h3 className="dashboard-project-project">Project</h3>
                            <h3 className="dashboard-project-name">{currentProject[0].name}</h3>
                            <img className="dashboard-project-expand"  src="../dashboard/expandblack.svg" alt="expand project options icon"/>  
                        </div>
                        <img className="dashboard-project-icon" src="../dashboard/settings.svg" alt="open project settings icon"
                        onClick={() => dispatch(showPopup(['ProjectSettings', 0]))}/>
                        
                    </div>
                    {everyPopup['ProjectDrop'][0] && <ProjectDrop />}
                </div>
            <div className="dashboard-body">
                {outputStarredProjectDraft}
                {outputProjectDraft}
            </div>
            <button className="dashboard-button" onClick={() => dispatch((showPopup(['NewDraft', 0])))}>
                <p className="dashboard-button-text">New Draft</p>
                <img src="../dashboard/create.svg" alt="create new draft icon" />
            </button>
            
            {everyPopup['NewDraft'][0] && <NewDraft />}
            {everyPopup['ProjectSettings'][0] && <ProjectSettings />}
            {everyPopup['NewProject'][0] && <NewProject />}

        </div>
    )
}