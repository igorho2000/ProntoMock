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
        <DraftInfo name={item.name} id={item.id} img={item.image} key={`draft${index}`} index={index} star={false} />
    ))
    const outputStarredProjectDraft = currentProject[0].starredDrafts.map((item, index) => (
        <DraftInfo name={item.name} id={item.id} img={item.image} key={`stardraft${index}`} index={index} star={true} />
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
            {
                currentProject[0].drafts.length + currentProject[0].starredDrafts.length === 0 
                &&
                <div className="dashboard-empty">
                    <h3>There are no drafts in this project.</h3>
                    <p>Click on "New Draft" to add a design.</p>
                </div>
            }
            
            <button className="dashboard-button" onClick={() => dispatch((showPopup(['NewDraft', 0])))}>
                <p className="dashboard-button-text">New Draft</p>
                <img src="../dashboard/create.svg" alt="create new draft icon" />
            </button>
            
            {everyPopup['NewDraft'][0] && <NewDraft />}
            {everyPopup['ProjectSettings'][0] && <ProjectSettings />}
            {everyPopup['NewProject'][0] && <NewProject />}
            <img src='../dashboard/star.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/unstar.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/duplicate-duplicate.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/duplicate.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/rename.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/rename-pencil.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/moveto.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/moveto-arrow.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/delete.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/delete-lid.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/settings.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/accountsettings.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/accountsettings-gear.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/logout.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/logout-arrow.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/newproject.svg' alt='pre-load icon' style={{display: 'none'}} />
            <img src='../dashboard/newproject-plus.svg' alt='pre-load icon' style={{display: 'none'}} />
        </div>
    )
}