import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import LeaveRequest from "../models/leaveRequestModel.js";

// @route       GET api/leaverequest
// @dec         Get all requests
// @access      Private/Admin
const getRequests = asyncHandler(async (req, res) => {
    // const leaveRequests = await LeaveRequest.find({}).populate("user", "name");
    // res.json(leaveRequests);
    const pendingLeaveRequests = await LeaveRequest.find({ isPending: true }).populate('user', 'name')
    const approvedLeaveRequests = await LeaveRequest.find({ isApproved: true }).populate('user', 'name')

    let rejectedLeaveRequests = [];
    const leaveRequests = await LeaveRequest.find({}).populate('user', 'name')
    leaveRequests.forEach(request => {
        if (request.rejected.isRejected) {
            rejectedLeaveRequests.push(request)
        }
    })

    res.json({ pendingLeaveRequests, approvedLeaveRequests, rejectedLeaveRequests })
});

// @route       GET api/leaverequest/:id
// @dec         Get a single Leave Request
// @access      Public
const getLeaveRequestById = asyncHandler(async (req, res) => {
    const leaveRequest = await LeaveRequest.findById(req.params.id)

    if (leaveRequest) {
        res.json(leaveRequest);
    } else {
        res.status(484);
        throw new Error("Leave request not found");
    }
});

// @route       POST api/leaverequest
// @dec         Create new request
// @access      Private
const createRequest = asyncHandler(async (req, res) => {
    // const { leaveType, from, to, subject, description } = req.body;

    const leaveRequest = new LeaveRequest({
        user: req.user._id,
        leaveType: 'Sick',
        subject: 'Sample Subject',
        description: 'Sample description'
    })

    const createdLeaveRequest = await leaveRequest.save()
    res.status(201).json(createdLeaveRequest)
});

// @route       PUT api/leaverequest/:id
// @dec         Update a request
// @access      Private/
const updateRequest = asyncHandler(async (req, res) => {
    const { leaveType, from, to, subject, description } = req.body;

    const leaveRequest = await LeaveRequest.findById(req.params.id)

    if (leaveRequest) {
        leaveRequest.leaveType = leaveType
        leaveRequest.from = from
        leaveRequest.to = to
        leaveRequest.subject = subject
        leaveRequest.description = description

        const updatedLeaveRequest = await leaveRequest.save()
        res.status(201).json(updatedLeaveRequest)
    } else {
        res.status(404)
        throw new Error('Leave request not found')
    }
});

// @route       DELETE api/leaverequest/:id
// @dec         Delete a single Request
// @access      Private
const deleteRequest = asyncHandler(async (req, res) => {
    const leaveRequest = await LeaveRequest.findById(req.params.id);

    if (leaveRequest) {
        await leaveRequest.remove();
        res.json({ message: "Request removed" });
    } else {
        res.status(484);
        throw new Error("Request not found");
    }
});

// @route       PUT api/leaverequest/:id/approve
// @dec         Update a request to approved
// @access      Private/Admin
const updateRequestToApproved = asyncHandler(async (req, res) => {
    const leaveRequest = await LeaveRequest.findById(req.params.id)

    if (leaveRequest) {
        leaveRequest.isApproved = true
        leaveRequest.isPending = false
        leaveRequest.rejected.isRejected = false

        const updatedLeaveRequest = await leaveRequest.save()
        res.status(201).json(updatedLeaveRequest)
    } else {
        res.status(404)
        throw new Error('Leave request not found')
    }
});

// @route       PUT api/leaverequest/:id/reject
// @dec         Update a request to rejected
// @access      Private/Admin
const updateRequestToRejected = asyncHandler(async (req, res) => {
    const leaveRequest = await LeaveRequest.findById(req.params.id)

    if (leaveRequest) {
        leaveRequest.isApproved = false
        leaveRequest.isPending = false
        leaveRequest.rejected.isRejected = true

        const updatedLeaveRequest = await leaveRequest.save()
        res.status(201).json(updatedLeaveRequest)
    } else {
        res.status(404)
        throw new Error('Leave request not found')
    }
});

// @route       PUT api/leaverequest/myleaverequests
// @dec         Get logged in user requests
// @access      Private/Admin
const getMyLeaveRequests = asyncHandler(async (req, res) => {
    const pendingLeaveRequests = await LeaveRequest.find({ user: req.user._id, isPending: true }).populate('user', 'name')
    const approvedLeaveRequests = await LeaveRequest.find({ user: req.user._id, isApproved: true }).populate('user', 'name')

    let rejectedLeaveRequests = [];
    const leaveRequests = await LeaveRequest.find({ user: req.user._id }).populate('user', 'name')
    leaveRequests.forEach(request => {
        if (request.rejected.isRejected) {
            rejectedLeaveRequests.push(request)
        }
    })

    res.json({ pendingLeaveRequests, approvedLeaveRequests, rejectedLeaveRequests })
});

export { getRequests, getLeaveRequestById, createRequest, updateRequest, deleteRequest, getMyLeaveRequests, updateRequestToApproved, updateRequestToRejected };
