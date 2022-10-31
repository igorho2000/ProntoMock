import React from "react";
import './Drop.css';

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';
import {
    switchProject, moveProjectDraft,
    selectEveryProject, selectCurrentProject
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";
import { db } from "../../Firebase";
import { updateDoc, doc } from "firebase/firestore";

export default function DraftMove(props) {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();
    const currentProject = useSelector(selectCurrentProject);

    const everyProject = useSelector(selectEveryProject);
    const datalist = everyProject.map((item, index) => (
        <option value={item.name} key={`option${index}`}>
            {item.name}
        </option>
    ))

    const [inputValue, setInputValue] = React.useState({
        value: '',
        index: 0,
    });

    function handleChange(event) {
        setInputValue((state) => ({
            value: event.target.value,
            index: event.target.selectedIndex
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const originalProjectID = currentProject[0].id.replace(' ', '');
        const targetProjectID = everyProject[inputValue.index].id.replace(' ', '');
        if (props.star === false) {
            var originalDrafts = [...currentProject[0].drafts];
            var targetDrafts = [...everyProject[inputValue.index].drafts];
            const toMove = originalDrafts.splice(props.index, 1);
            targetDrafts = targetDrafts.concat(toMove);
            updateDoc(doc(db, 'projects', originalProjectID), {
                drafts: originalDrafts
            })
            updateDoc(doc(db, 'projects', targetProjectID), {
                drafts: targetDrafts
            })
        } else {
            var originalStarredDrafts = [...currentProject[0].starredDrafts];
            var targetStarredDrafts = [...everyProject[inputValue.index].starredDrafts];
            const toMove = originalStarredDrafts.splice(props.index, 1);
            targetStarredDrafts = targetStarredDrafts.concat(toMove);
            updateDoc(doc(db, 'projects', originalProjectID), {
                starredDrafts: originalStarredDrafts
            })
            updateDoc(doc(db, 'projects', targetProjectID), {
                starredDrafts: targetStarredDrafts
            })
        }
        dispatch(moveProjectDraft([props.index, props.star, inputValue.index]));
        dispatch(resetPopups());
        dispatch(switchProject(inputValue.index));
    }

    return (
        <div className="popupform-positioner">
            <div className="popupform" ref={wrapperRef} >
                <h4 className="popupform-title">Move Draft</h4>
                <form className="popupform-form" onSubmit={handleSubmit}>
                    <div className="popupform-input">
                        <label>Move to</label>
                        <select value={inputValue.value} onChange={handleChange} id="projects">
                            {datalist}
                        </select>
                    </div>
                    <div className="popupform-buttoncont" style={{marginTop: '5px'}}>
                        <button className="popupform-button" onClick={() => dispatch(resetPopups())}>Cancel</button>
                        <input className="popupform-button popupform-button-blue popupform-button-right" type="submit" value="Move" />
                    </div>
                </form>
            </div>
        </div>
        
    )
}