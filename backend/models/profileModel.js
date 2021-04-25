const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        homeAddress: {
            type: String,
            required: true,
        },
        faculty: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        dadPhoneNumber: {
            type: String,
            required: true,
        },
        momPhoneNumber: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
