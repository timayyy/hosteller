import React, { useState, useEffect } from "react";
import { Form, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import RequestComponent from "../components/RequestComponent";
import { LEAVE_REQUEST_CREATE_RESET } from "../constants/leaveRequestConstants";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import {
  listLeaveRequests,
  listMyLeaveRequests,
  createLeaveRequest,
  approveLeaveRequest,
  rejectLeaveRequest,
} from "../actions/leaveRequestActions";

const ProfileScreen = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const leaveRequestCreate = useSelector((state) => state.leaveRequestCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    leaveRequest: createdLeaveRequest,
  } = leaveRequestCreate;

  const leaveRequestList = useSelector((state) => state.leaveRequestList);
  const {
    loading: loadingRequest,
    error: errorRequest,
    pendingLeaveRequests,
    approvedLeaveRequests,
    rejectedLeaveRequests,
  } = leaveRequestList;

  const leaveRequestListMy = useSelector((state) => state.leaveRequestListMy);
  const {
    loading: loadingMyRequest,
    error: errorMyRequest,
    pendingLeaveRequests: myPendingLeaveRequests,
    approvedLeaveRequests: myApprovedLeaveRequests,
    rejectedLeaveRequests: myRejectedLeaveRequests,
  } = leaveRequestListMy;

  const leaveRequestApprove = useSelector((state) => state.leaveRequestApprove);
  const {
    loading: loadingApprove,
    error: errorApprove,
    success: successApprove,
  } = leaveRequestApprove;

  const leaveRequestReject = useSelector((state) => state.leaveRequestReject);
  const {
    loading: loadingReject,
    error: errorReject,
    success: successReject,
  } = leaveRequestReject;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({ type: LEAVE_REQUEST_CREATE_RESET });
    dispatch(listLeaveRequests());
    dispatch(listMyLeaveRequests());

    if (!userInfo) {
      history.push("/login");
    }
    if (userInfo && !userInfo.isActive) {
      history.push("/login");
    }

    // if(successApprove) {

    // }

    if (successCreate) {
      history.push(`/leaverequest/${createdLeaveRequest._id}/edit`);
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listLeaveRequests());
        dispatch(listMyLeaveRequests());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [
    history,
    userInfo,
    dispatch,
    user,
    successCreate,
    createdLeaveRequest,
    successApprove,
    successReject,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      //Update Profile
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  const createRequestHandler = () => {
    dispatch(createLeaveRequest());
  };

  const approveLeaveRequestHandler = (id) => {
    dispatch(approveLeaveRequest(id));
  };

  const rejectLeaveRequestHandler = (id) => {
    dispatch(rejectLeaveRequest(id));
  };

  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmpassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <button type="submit" className="btn custom-btn-primary">
            Update
          </button>
        </Form>
      </Col>
      <Col md={9}>
        <h1 className="site-headline font-weight-bold mb-3 text-dark">
          Welcome{" "}
          <span className="hero-fancy-text text-capitalize">{user.name}</span>,
        </h1>
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loadingCreate && <Loader />}
        <button
          className="btn custom-btn-primary"
          onClick={createRequestHandler}
        >
          <i className="fas fa-plus mr-2"></i>Apply for leave
        </button>
        <div className="py-3">
          <Tabs fill defaultActiveKey="pending" id="uncontrolled-tab-example">
            <Tab
              eventKey="pending"
              title={`Pending (${
                pendingLeaveRequests
                  ? pendingLeaveRequests.length
                  : myPendingLeaveRequests && myPendingLeaveRequests.length
              })`}
            >
              <Row className="py-3">
                {errorApprove && (
                  <Message variant="danger">{errorApprove}</Message>
                )}
                {loadingApprove && <Loader />}
                {errorReject && (
                  <Message variant="danger">{errorReject}</Message>
                )}
                {loadingReject && <Loader />}
                {userInfo.isAdmin ? (
                  loadingRequest ? (
                    <Loader />
                  ) : errorRequest ? (
                    <Message variant="danger">{errorRequest}</Message>
                  ) : pendingLeaveRequests.length > 0 ? (
                    pendingLeaveRequests.map((leaveRequest) => (
                      <>
                        <Col md={6}>
                          <RequestComponent
                            leaveRequest={leaveRequest}
                            approveLeaveRequestHandler={
                              approveLeaveRequestHandler
                            }
                            rejectLeaveRequestHandler={
                              rejectLeaveRequestHandler
                            }
                          />
                        </Col>
                      </>
                    ))
                  ) : (
                    <Col>
                      <Message variant="warning">No pending requests</Message>
                    </Col>
                  )
                ) : loadingMyRequest ? (
                  <Loader />
                ) : errorMyRequest ? (
                  <Message variant="danger">{errorMyRequest}</Message>
                ) : myPendingLeaveRequests.length > 0 ? (
                  myPendingLeaveRequests.map((leaveRequest) => (
                    <>
                      <Col md={6}>
                        <RequestComponent leaveRequest={leaveRequest} />
                      </Col>
                    </>
                  ))
                ) : (
                  <Col>
                    <Message variant="warning">No pending requests</Message>
                  </Col>
                )}
              </Row>
            </Tab>
            <Tab
              eventKey="approved"
              title={`Approved (${
                approvedLeaveRequests
                  ? approvedLeaveRequests.length
                  : myApprovedLeaveRequests && myApprovedLeaveRequests.length
              })`}
            >
              <Row className="py-3">
                {userInfo.isAdmin ? (
                  loadingRequest ? (
                    <Loader />
                  ) : errorRequest ? (
                    <Message variant="danger">{errorRequest}</Message>
                  ) : approvedLeaveRequests.length > 0 ? (
                    approvedLeaveRequests.map((leaveRequest) => (
                      <>
                        <Col md={6}>
                          <RequestComponent
                            leaveRequest={leaveRequest}
                            approveLeaveRequestHandler={
                              approveLeaveRequestHandler
                            }
                            rejectLeaveRequestHandler={
                              rejectLeaveRequestHandler
                            }
                          />
                        </Col>
                      </>
                    ))
                  ) : (
                    <Col>
                      <Message>No approved requests</Message>
                    </Col>
                  )
                ) : loadingMyRequest ? (
                  <Loader />
                ) : errorMyRequest ? (
                  <Message variant="danger">{errorMyRequest}</Message>
                ) : myApprovedLeaveRequests.length > 0 ? (
                  myApprovedLeaveRequests.map((leaveRequest) => (
                    <>
                      <Col md={6}>
                        <RequestComponent leaveRequest={leaveRequest} />
                      </Col>
                    </>
                  ))
                ) : (
                  <Col>
                    <Message>No approved requests</Message>
                  </Col>
                )}
              </Row>
            </Tab>
            <Tab
              eventKey="rejected"
              title={`Rejected (${
                rejectedLeaveRequests
                  ? rejectedLeaveRequests.length
                  : myRejectedLeaveRequests && myRejectedLeaveRequests.length
              })`}
            >
              <Row className="py-3">
                {userInfo.isAdmin ? (
                  loadingRequest ? (
                    <Loader />
                  ) : errorRequest ? (
                    <Message variant="danger">{errorRequest}</Message>
                  ) : rejectedLeaveRequests.length > 0 ? (
                    rejectedLeaveRequests.map((leaveRequest) => (
                      <>
                        <Col md={6}>
                          <RequestComponent
                            leaveRequest={leaveRequest}
                            approveLeaveRequestHandler={
                              approveLeaveRequestHandler
                            }
                            rejectLeaveRequestHandler={
                              rejectLeaveRequestHandler
                            }
                          />
                        </Col>
                      </>
                    ))
                  ) : (
                    <Col>
                      <Message variant="danger">No rejected requests</Message>
                    </Col>
                  )
                ) : loadingMyRequest ? (
                  <Loader />
                ) : errorMyRequest ? (
                  <Message variant="danger">{errorMyRequest}</Message>
                ) : myRejectedLeaveRequests.length > 0 ? (
                  myRejectedLeaveRequests.map((leaveRequest) => (
                    <>
                      <Col md={6}>
                        <RequestComponent leaveRequest={leaveRequest} />
                      </Col>
                    </>
                  ))
                ) : (
                  <Col>
                    <Message variant="danger">No rejected requests</Message>
                  </Col>
                )}
              </Row>
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
