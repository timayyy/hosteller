import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getProfile } from "../actions/profileActions";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, profile } = userProfile;

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = <Loader />
  } else {
    //Check if logged in user has profile data
    if (Object.keys(profile).length > 0) {
      dashboardContent = <h1>Yaaassssssssss profile</h1>
    } else {
      //No profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome <span className="text-capitalize">{userInfo.name}</span></p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
        </div>
      )
    }

  }

  return (
    <div>
      {/* {loading ? <Loader /> : profile != null ? <h1>Profile Screen</h1> : <h1>Create Profile</h1>} */}
      <div className="display-4">Dasboard</div>
      {dashboardContent}
    </div>
  )
}

export default ProfileScreen
