import axios from "axios";
import {
    LEAVE_REQUEST_LIST_REQUEST,
    LEAVE_REQUEST_LIST_SUCCESS,
    LEAVE_REQUEST_LIST_FAIL,
    LEAVE_REQUEST_LIST_MY_FAIL,
    LEAVE_REQUEST_LIST_MY_SUCCESS,
    LEAVE_REQUEST_LIST_MY_REQUEST,
    LEAVE_REQUEST_CREATE_SUCCESS,
    LEAVE_REQUEST_CREATE_REQUEST, LEAVE_REQUEST_CREATE_FAIL, LEAVE_REQUEST_DETAILS_FAIL, LEAVE_REQUEST_DETAILS_REQUEST, LEAVE_REQUEST_DETAILS_SUCCESS, LEAVE_REQUEST_UPDATE_SUCCESS, LEAVE_REQUEST_UPDATE_FAIL, LEAVE_REQUEST_UPDATE_REQUEST, LEAVE_REQUEST_APPROVE_FAIL, LEAVE_REQUEST_APPROVE_SUCCESS, LEAVE_REQUEST_APPROVE_REQUEST, LEAVE_REQUEST_REJECT_FAIL, LEAVE_REQUEST_REJECT_SUCCESS, LEAVE_REQUEST_REJECT_REQUEST

} from "../constants/leaveRequestConstants.js";


export const listLeaveRequests = () => async (
    dispatch, getState
) => {
    try {
        dispatch({ type: LEAVE_REQUEST_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/leaverequest`, config
        );

        dispatch({
            type: LEAVE_REQUEST_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LEAVE_REQUEST_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listMyLeaveRequests = () => async (
    dispatch, getState
) => {
    try {
        dispatch({ type: LEAVE_REQUEST_LIST_MY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/leaverequest/myleaverequests`, config
        );

        dispatch({
            type: LEAVE_REQUEST_LIST_MY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LEAVE_REQUEST_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createLeaveRequest = () => async (
    dispatch, getState
) => {
    try {
        dispatch({ type: LEAVE_REQUEST_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/leaverequest`, {}, config
        );

        dispatch({
            type: LEAVE_REQUEST_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LEAVE_REQUEST_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listLeaveRequestDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: LEAVE_REQUEST_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/leaverequest/${id}`, config);

        dispatch({
            type: LEAVE_REQUEST_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LEAVE_REQUEST_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateLeaveRequest = (request) => async (dispatch, getState) => {
    try {
        dispatch({ type: LEAVE_REQUEST_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/leaverequest/${request._id}`, request, config);

        dispatch({
            type: LEAVE_REQUEST_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LEAVE_REQUEST_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const approveLeaveRequest = (requestId) => async (dispatch, getState) => {
    try {
        dispatch({ type: LEAVE_REQUEST_APPROVE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/leaverequest/${requestId}/approve`, {}, config);

        dispatch({
            type: LEAVE_REQUEST_APPROVE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LEAVE_REQUEST_APPROVE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const rejectLeaveRequest = (requestId) => async (dispatch, getState) => {
    try {
        dispatch({ type: LEAVE_REQUEST_REJECT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/leaverequest/${requestId}/reject`, {}, config);

        dispatch({
            type: LEAVE_REQUEST_REJECT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LEAVE_REQUEST_REJECT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};