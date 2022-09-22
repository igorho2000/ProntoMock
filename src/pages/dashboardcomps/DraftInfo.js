import React from 'react';
import '../Dashboard.css';

import DraftDrop from './DraftDrop';

import { useSelector, useDispatch } from 'react-redux';
import {
    showPopup,
    selectEveryPopup,
} from '../../features/popupSlice';

import DraftRename from "./DraftRename";
import DraftMove from './DraftMove';

export default function DraftInfo(props) {
    
    const dispatch = useDispatch();
    const everyPopup = useSelector(selectEveryPopup);

    return (
        <div className="dashboard-draft" style={{backgroundColor: props.star && "#edc732"}}>
            <div className="dashboard-draft-cont">
                <div className="dashboard-draft-title">
                    <h4 className="dashboard-draft-name">{props.name}</h4>
                    <h5 className="dashboard-draft-type">{props.type}</h5>
                    <h6 className="dashboard-draft-date">{`Last Updated: ${props.date}`}</h6>
                </div>
                <div className='dashboard-draft-settings'>
                    {props.star ?
                    <img className="dashboard-draft-more" src="../dashboard/more.svg" alt="more options icon"
                    onClick={() => 
                        dispatch(showPopup(['StarDraftDrop', props.index]))
                    }/>:
                    <img className="dashboard-draft-more" src="../dashboard/more.svg" alt="more options icon"
                    onClick={() => 
                        dispatch(showPopup(['DraftDrop', props.index]))
                    }/>
                    }
                    {props.star ?
                    everyPopup.StarDraftDrop[props.index] && <DraftDrop index={props.index} star={props.star} /> :
                    everyPopup.DraftDrop[props.index] && <DraftDrop index={props.index} star={props.star} />}
                </div>
            </div>
            <img className="dashboard-draft-img" src="../dashboard/ex1.png" alt="draft demo" />
            {
                props.star ?
                everyPopup.StarredDraftRename[props.index] && <DraftRename index={props.index} star={props.star} name={props.name} />
                :
                everyPopup.DraftRename[props.index] && <DraftRename index={props.index} star={props.star} name={props.name} /> 
            }
            {
                props.star ?
                everyPopup.StarredDraftMove[props.index] && <DraftMove index={props.index} star={props.star} name={props.name} />
                :
                everyPopup.DraftMove[props.index] && <DraftMove index={props.index} star={props.star} name={props.name} />
            }
        </div>
    )
}