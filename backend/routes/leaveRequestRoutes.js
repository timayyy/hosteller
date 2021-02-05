import express from "express";
import {
    getRequests,
    createRequest,
    updateRequest,
    deleteRequest,
    getMyLeaveRequests,
    getLeaveRequestById,
    updateRequestToApproved,
    updateRequestToRejected
} from "../controllers/leaveRequestController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, admin, getRequests).post(protect, createRequest)
router.route("/myleaverequests").get(protect, getMyLeaveRequests)
router.route("/:id").get(protect, getLeaveRequestById).put(protect, updateRequest).delete(protect, admin, deleteRequest)
router.route("/:id/approve").put(protect, admin, updateRequestToApproved)
router.route("/:id/reject").put(protect, admin, updateRequestToRejected)


export default router;
