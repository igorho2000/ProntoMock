import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import './App.css';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Transition from './pages/Transition';
import Editor from './editor/Editor';
import Header from './pages/Header';

import {useSelector, useDispatch} from 'react-redux';
import {selectEveryPopup} from './features/popupSlice';
import { selectCurrentProject,  initializeCurrentProject, initializeEveryProject, wipeProject } from './features/projectSlice';

import {auth, db} from './Firebase';
import { doc, getDoc, addDoc, setDoc, collection } from "firebase/firestore";

import {changeUserState, selectUser, changeUserProjects} from './features/userSlice'

function App() {
    const everyPopup = useSelector(selectEveryPopup);
    const currentProject = useSelector(selectCurrentProject);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
          if (user) {
              dispatch(changeUserState({
                  name: user.displayName,
                  email: user.email,
                  phone: user.phoneNumber,
                  photo: user.photoURL,
                  token: user.accessToken,
                  id: user.uid
              }))
              getDoc(doc(db, 'user', user.uid)).then((result) => {
                if (result.exists()) {
                    const allProjects = [...result.data().projects];
                    dispatch(changeUserProjects(allProjects))
                    for (let i = 0; i < allProjects.length; i++) {
                      if (i === 0) {
                          getDoc(doc(db, 'projects', allProjects[i])).then((result) => {
                          dispatch(initializeCurrentProject(result.data()));
                          })
                          continue
                      }
                      getDoc(doc(db, 'projects', allProjects[i])).then((result) => {
                          dispatch(initializeEveryProject(result.data()));
                      })
                    }
                } else {
                    addDoc(collection(db, 'projects'), {
                        drafts: [],
                        starredDrafts: [],
                        name: 'Alpha',
                        team: [user.uid]
                    }).then((result) => {
                        const projectID = result.id;
                        console.log(result.id);
                        setDoc(doc(db, 'user', user.uid), {projects: [projectID]});
                        setDoc(doc(db, 'projects', projectID), {id:projectID}, {merge: true});
                        dispatch(initializeCurrentProject({
                            drafts: [],
                            starredDrafts: [],
                            name: 'Alpha',
                            team: [user.uid],
                            id:projectID,
                        }))
                        dispatch(changeUserProjects([projectID]))
                    })
                }
            });
          } else {
              dispatch(changeUserState(null));
              dispatch(changeUserProjects([]));
              dispatch(wipeProject());
          }
        }) 
    }, [])

    return (
        <div onContextMenu={(event) => {
          event.preventDefault();
        }} onDragOver={(event) => {
          // if (event.target.className === 'imageuploader') {
          //   return
          // }
          event.preventDefault();
        }} onDrop={(event) => {
          event.preventDefault();
        }}
        >
      
            <Routes>
                  {user === 'start' && <Route path="/" element={<Transition />} /> }
                  {user === 'start' && <Route path="/dashboard" element={<Transition />} /> }
                  {user === 'start' && <Route path="/draft" element={<Transition />} /> }
                  {(user !== null && currentProject.length === 0) && <Route path="/dashboard" element={<Header loading={true} />} />}
                  {(user === null && user !== 'start') ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Navigate replace to="/dashboard" />} />}
                  {(user !== null && user !== 'start' && currentProject.length !== 0) ? <Route path="/dashboard" element={<Dashboard />} /> : <Route path="/dashboard" element={<Navigate replace to="/" />} />}
                  {(user !== null && user !== 'start' && currentProject.length !== 0) ? <Route path="/dashboard/" element={<Dashboard />} /> : <Route path="/dashboard" element={<Navigate replace to="/" />} />}
                  {(user !== null && user !== 'start') ? <Route path="/draft" element={<Editor />} /> : <Route path="/draft" element={<Navigate replace to="/" />} />}
            </Routes>
            {everyPopup.Transition && <Transition />}
        </div>
    );
}

export default App;
