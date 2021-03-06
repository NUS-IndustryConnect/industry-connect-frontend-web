import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";

import './index.css';
import Page from '../../../common/Page';
import { handleFetchAuth, handleLocalAuth, logout } from '../../../redux/user/userActions';
import { AUTH_ENPOINT, isLocalDev, STUDENT } from '../../../server/utils';

export default function Login(props) {
  // TODO: link up to authentication (temporary placeholder)
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  let code = location.search.substring(6);

  const handleOnClick = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (code) {
      dispatch(handleFetchAuth(code)).then(() => {
        history.push("/student/announcements");
      }).catch(error => {
        dispatch(logout()).then(() => {
          history.push("/student/login");
        })
      })
    }
  }, [code, dispatch, history]);

  if (code) { // buffer to wait for info
    return (
      <Page title="Student Dashboard">
      <div className="login">
        <h3>Welcome to IndustryConnect!</h3>
        <p>SoC Industry Updates is a platform made by students, for students. It serves as a one-stop shop for students from the School of Computing to learn about internships, jobs and future career opportunities in various industries.</p>
        <ClipLoader color="#003D7C" loading={true} size={50} />
        <p>Logging in...</p>
        <p>If you are not logged in, click this link to redirect to login page <a className="primary" href="/student/login" onClick={handleOnClick}>Sign In</a></p>
        <p>Otherwise, please wait patiently. Thank you.</p>
      </div>
    </Page>
    )
  }

  const handleLocalDevAuth = () => {
    dispatch(handleLocalAuth(STUDENT)).then(() => {
      history.push("/student/announcements");
    }).catch(error => {
      dispatch(logout()).then(() => {
        history.push("/student/login");
      })
    })
  }

  return (
    <Page title="Student Dashboard">
      <div className="login">
        <h3>Welcome to IndustryConnect!</h3>
        <p>SoC Industry Updates is a platform made by students, for students. It serves as a one-stop shop for students from the School of Computing to learn about internships, jobs and future career opportunities in various industries.</p>
        {isLocalDev && <button className="primary" onClick={handleLocalDevAuth}>Login</button>}
        { !isLocalDev && (
          <a className="primary" href={AUTH_ENPOINT}>
            <button className="primary">Login</button>
          </a>
        )}
      </div>
    </Page>
  )
}
