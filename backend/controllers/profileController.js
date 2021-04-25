const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");

// @route       GET api/profile
// @dec         Get current user profile
// @access      Private
const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const userProfile = await Profile.findOne({ user: req.user._id }).populate("user")
    if (!userProfile) {
        res.status(404);
        throw new Error("Create a profile");
    } else {
        res.json(userProfile)
    }
});

// @route       POST api/profile
// @dec         Create user profile
// @access      Private
const createUserProfile = asyncHandler(async (req, res) => {
    const { homeAddress, faculty, department, dateOfBirth, dadPhoneNumber, momPhoneNumber } = req.body
    const user = req.user._id

    const profile = await Profile.create({
        user,
        homeAddress,
        faculty,
        department,
        dateOfBirth,
        dadPhoneNumber,
        momPhoneNumber
    })

    if (profile) {
        res.status(201).json({
            user: profile.user,
            homeAddress: profile.homeAddress,
            faculty: profile.faculty,
            department: profile.department,
            dateOfBirth: profile.dateOfBirth,
            dadPhoneNumber: profile.dadPhoneNumber,
            momPhoneNumber: profile.momPhoneNumber
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

});

// @route       PUT api/profile
// @dec         Update user profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, matricNumber, lasuEmail, password, phoneNumber, gender, homeAddress, faculty, department, dateOfBirth, dadPhoneNumber, momPhoneNumber } = req.body
    const user = req.user._id

    const profile = await Profile.findOne({ user })
    const dbUser = await User.findById(user)

    if (profile) {
        dbUser.name = name || dbUser.name
        dbUser.matricNumber = matricNumber || dbUser.matricNumber
        dbUser.lasuEmail = lasuEmail || dbUser.lasuEmail
        dbUser.password = password || dbUser.password
        dbUser.phoneNumber = phoneNumber || dbUser.phoneNumber
        dbUser.gender = gender || dbUser.gender
        profile.homeAddress = homeAddress || profile.homeAddress
        profile.faculty = faculty || profile.faculty
        profile.department = department || profile.department
        profile.dateOfBirth = dateOfBirth || profile.dateOfBirth
        profile.dadPhoneNumber = dadPhoneNumber || profile.dadPhoneNumber
        profile.momPhoneNumber = momPhoneNumber || profile.momPhoneNumber

        const updatedDbUser = await dbUser.save()
        const updatedProfile = await profile.save()
        res.json(updatedProfile)
    } else {
        res.status(404);
        throw new Error("Profile not found");
    }


});

// @route       GET api/profile/:user_id
// @dec         Get user profile by ID
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const userProfile = await Profile.findOne({ user: req.params.user_id }).populate("user")
        if (!userProfile) {
            res.status(404);
            throw new Error("There is no profile for this user");
        } else {
            res.json(userProfile)
        }
    } catch (err) {
        // console.log(err)
        throw new Error("There is no profile for this user");
    }
});

module.exports = {
    getCurrentUserProfile,
    getUserProfile,
    createUserProfile,
    updateUserProfile
};