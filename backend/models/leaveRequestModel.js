import mongoose from "mongoose";

const lrSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        leaveType: {
            type: String,
            enum: ["Sick", "Casual", "Annual"],
        },
        from: {
            type: Date,
            required: true,
            default: Date.now,
        },
        to: {
            type: Date,
            required: true,
            default: Date.now,
        },
        subject: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isPending: {
            type: Boolean,
            default: true
        },
        isApproved: {
            type: Boolean,
            default: false
        },
        rejected: {
            isRejected: {
                type: Boolean,
                default: false
            },
            reason: {
                type: String,
            }
        },
        // permission: {
        //     type: String,
        //     enum: ["Pending", "Approved", "Rejected"],
        //     default: 'Pending'
        // },
    },
    {
        timestamps: true,
    }
);

const LeaveRequest = mongoose.model("LeaveRequest", lrSchema);

export default LeaveRequest;