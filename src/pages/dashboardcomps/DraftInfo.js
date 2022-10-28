import React from 'react';
import '../Dashboard.css';

import DraftDrop from './DraftDrop';

import { useSelector, useDispatch } from 'react-redux';
import {
    showPopup, transition,
    selectEveryPopup, resetPopups
} from '../../features/popupSlice';
import { WipeDraft } from '../../features/draftSlice';
import DraftRename from "./DraftRename";
import DraftMove from './DraftMove';
import { Link } from 'react-router-dom';

export default function DraftInfo(props) {
    
    const dispatch = useDispatch();
    const everyPopup = useSelector(selectEveryPopup);

    return (
        <div className="dashboard-draft">
            <div className='dashboard-draft-cont'>
                <img className="dashboard-draft-img" src={props.img} alt={props.name} />
                <div className='dashboard-draft-info' >
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
                    <Link to={`/draft/${props.id}`} onClick={() => {
                        dispatch(WipeDraft());
                        dispatch(transition());
                        setTimeout(() => {
                            dispatch(resetPopups())
                        }, 3000)
                    }} ><h3 style={{color:'black'}}>{props.name}</h3></Link>
                </div>
                {props.star &&
                <img className='dashboard-draft-star' src='../dashboard/star-gold.svg' />
                }
            </div>
            {
                props.star ?
                everyPopup.StarredDraftRename[props.index] && <DraftRename index={props.index} id={props.id} star={props.star} name={props.name} />
                :
                everyPopup.DraftRename[props.index] && <DraftRename index={props.index} id={props.id} star={props.star} name={props.name} /> 
            }
            {
                props.star ?
                everyPopup.StarredDraftMove[props.index] && <DraftMove index={props.index} id={props.id} star={props.star} name={props.name} />
                :
                everyPopup.DraftMove[props.index] && <DraftMove index={props.index} id={props.id} star={props.star} name={props.name} />
            }
        </div>
    )
}