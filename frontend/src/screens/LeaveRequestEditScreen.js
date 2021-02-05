// import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listLeaveRequestDetails, updateLeaveRequest } from "../actions/leaveRequestActions";
import { LEAVE_REQUEST_UPDATE_RESET } from "../constants/leaveRequestConstants";

const LeaveRequestEditScreen = ({ match, history }) => {
    const leaveRequestId = match.params.id;

    const [leaveType, setLeaveType] = useState("");
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [subject, setSubject] = useState([]);
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();

    const leaveRequestDetails = useSelector((state) => state.leaveRequestDetails);
    const { loading, error, leaveRequest } = leaveRequestDetails;

    const leaveRequestUpdate = useSelector((state) => state.leaveRequestUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = leaveRequestUpdate;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (successUpdate) {
            dispatch({ type: LEAVE_REQUEST_UPDATE_RESET });
            history.push("/dashboard");
        } else {
            if (!leaveRequest.leaveType || leaveRequest._id !== leaveRequestId) {
                dispatch(listLeaveRequestDetails(leaveRequestId));
            } else {
                setLeaveType(leaveRequest.leaveType);
                setFrom(leaveRequest.from.substring(0, 10));
                setTo(leaveRequest.to.substring(0, 10));
                setSubject(leaveRequest.subject);
                setDescription(leaveRequest.description);
            }
        }
    }, [dispatch, history, leaveRequestId, leaveRequest, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        //UPDATE PRODUCT
        dispatch(
            updateLeaveRequest({
                _id: leaveRequestId,
                leaveType,
                from,
                to,
                subject,
                description
            })
        );
    };
    return (
        <div className='container'>
            <Link to='/dashboard' className='btn btn-light my-3'>
                Go Back
      </Link>
            <FormContainer>
                <h1>Edit Leave Request</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                            <Form onSubmit={submitHandler} className='p-3'>
                                <Form.Group controlId='leavetype'>
                                    <Form.Label>Select Leave Type</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={leaveType}
                                        onChange={(e) => setLeaveType(e.target.value)}
                                    >
                                        <option value='Sick'>Sick leave</option>
                                        <option value='Annual'>Annual leave</option>
                                        <option value='Casual'>Casual leave</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="fromdate">
                                        <Form.Label>From</Form.Label>
                                        <Form.Control type='date' value={from} onChange={(e) => setFrom(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="todate">
                                        <Form.Label>To</Form.Label>
                                        <Form.Control type='date' value={to} onChange={(e) => setTo(e.target.value)} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId='subject'>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter subject'
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder='Enter description '
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)} rows={3} />
                                </Form.Group>

                                <button type='submit' className="btn custom-btn-primary">
                                    Update
                                </button>
                            </Form>
                        )}
            </FormContainer>
        </div>
    );
};

export default LeaveRequestEditScreen;
