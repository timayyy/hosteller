import React from 'react'
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Col, Row } from "react-bootstrap";
import Message from "../components/Message";

const RequestComponent = ({ leaveRequest, approveLeaveRequestHandler, rejectLeaveRequestHandler }) => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    return (
        <Card>
            <Card.Header>{leaveRequest.user.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    From: {leaveRequest.from.substring(0, 10)} <br />
                   To: {leaveRequest.to.substring(0, 10)}
                </Card.Text>
                <Card>
                    <Card.Header>{leaveRequest.leaveType}</Card.Header>
                    <Card.Body>
                        <Card.Title>{leaveRequest.subject}</Card.Title>
                        <Card.Text>
                            {leaveRequest.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
                {leaveRequest.isPending ? <Message variant='warning'>Pending</Message> : leaveRequest.isApproved ? <Message variant='success'>Approved</Message> : leaveRequest.rejected && leaveRequest.rejected.isRejected ? <Message variant='danger'>Rejected</Message> : null}
                {userInfo.isAdmin && leaveRequest.isPending && (
                    <Row>
                        <Col md={6}><button onClick={() => { approveLeaveRequestHandler(leaveRequest._id) }} className='btn btn-block custom-btn-primary'>Approve
                </button></Col>
                        <Col md={6}><button onClick={() => { rejectLeaveRequestHandler(leaveRequest._id) }} className='btn btn-block btn-danger'>Reject
                </button></Col>
                    </Row>
                )}
                {!userInfo.isAdmin && leaveRequest.isPending && (
                    <Row>
                        <Col md={6}>
                            <LinkContainer to={`/leaverequest/${leaveRequest._id}/edit`}>
                                <button className='btn btn-block custom-btn-primary'>Edit</button>
                            </LinkContainer>
                        </Col>
                        <Col md={6}><button className='btn btn-block btn-danger'>Delete</button></Col>
                    </Row>
                )}
            </Card.Body>
        </Card>
    )
}

export default RequestComponent
