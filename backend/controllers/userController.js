// import asyncHandler from "express-async-handler";
// import generateToken from "../utils/generateToken.js";
// import User from "../models/userModel.js";

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
//Send email util function
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");

// @route       POST api/users/login
// @dec         Auth the user and get token
// @access      Public
const authUser = asyncHandler(async (req, res) => {
  const { matricNumber, password } = req.body;

  const user = await User.findOne({ matricNumber });

  if (!user) {
    res.status(401);
    throw new Error("Invalid matric number or password");
  }
  if (!user.isActive) {
    res.status(400);
    throw new Error("Please confirm your email to login");
  }

  // if (!user.isActive) {
  //   res.status(400);
  //   throw new Error("Please confirm your email to login");
  // }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      matricNumber: user.matricNumber,
      lasuEmail: user.lasuEmail,
      photo: user.photo,
      faculty: user.faculty,
      department: user.department,
      homeAddress: user.homeAddress,
      dateOfBirth: user.dateOfBirth,
      studentPhoneNumber: user.studentPhoneNumber,
      dadPhoneNumber: user.dadPhoneNumber,
      momPhoneNumber: user.momPhoneNumber,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid matric number or password");
  }
});

// @route       POST api/users/
// @dec         Register a new user
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    matricNumber,
    lasuEmail,
    password,
    password2,
    photo,
    faculty,
    department,
    homeAddress,
    dateOfBirth,
    studentPhoneNumber,
    dadPhoneNumber,
    momPhoneNumber,
  } = req.body;

  //Check if email is a valid lasu email
  // if (!lasuEmail.includes("@st.lasu.edu.ng")) {
  //   res.status(400);
  //   throw new Error("Email must be a Lasu email");
  // }

  //Check if passwords match
  if (password != password2) {
    res.status(400);
    throw new Error("Password do not match");
  }

  // const strongPasswordChecker = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  //Check password length
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  //Check if there is a letter in password
  if (password.search(/[a-z]/i) < 0) {
    throw new Error("Your password must contain at least one letter.");
  }

  //Check if password contains a lowercase letter
  if (password.search(/[a-z]/) < 0) {
    throw new Error(
      "Your password must contain at least one lowercase letter."
    );
  }

  //Check if password contains a uppercase letter
  if (password.search(/[A-Z]/) < 0) {
    throw new Error(
      "Your password must contain at least one uppercase letter."
    );
  }

  //Check if password contains a number
  if (password.search(/[0-9]/) < 0) {
    throw new Error("Your password must contain at least one digit.");
  }

  // if (
  //   matricNumber.substring(4, 6) != "11" ||
  //   matricNumber.substring(4, 6) != "21" ||
  //   matricNumber.substring(4, 6) != "31"
  // ) {
  //   res.status(400);
  //   throw new Error("Matric Number must be a valid one");
  //   console.log(true);
  // } else {
  //   console.log(false);
  // }

  const userLasuEmailExists = await User.findOne({ lasuEmail });
  const userMatricNumberExists = await User.findOne({ matricNumber });

  if (userLasuEmailExists || userMatricNumberExists) {
    res.status(400);
    throw new Error("Email or matric number already exists");
  }

  const user = await User.create({
    name,
    matricNumber,
    lasuEmail,
    password,
    photo,
    faculty,
    department,
    homeAddress,
    dateOfBirth,
    studentPhoneNumber,
    dadPhoneNumber,
    momPhoneNumber,
  });

  const emailToken = generateToken(user._id);
  const clientUrl = process.env.CLIENT_ORIGIN;
  console.log(clientUrl);

  const output = `
      <div>
        <div>
          <img src="https://lasu.edu.ng/home/img/logo1.png" style="width: 128px" />
        </div>
        <div>
          <h3>Hi ${user.name},<h3>
        </div>
        <div>
        <p style="text-align: center">You registered an account on Hosteller, before being able to use your account you need to verify that this is your email address by clicking here:</p>
        </div>
        <div style="text-align: center">
          <a href=${clientUrl}/confirm/${emailToken}
            style="background-color: green; 
            color: #fff;
            border-color: green;
            display: inline-block;
            font-weight: 400;
            text-align: center;
            vertical-align: middle;
            border: 1px solid transparent;
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: .25rem;
          "
          >
          VERIFY YOUR ACCOUNT
          </a>
        </div>  
        <div>
          <h3> Welcome to Hosteller! <br>
          The Hosteller Team
          </h3>
        </div>
      </div>
  `;

  await sendEmail({
    email: lasuEmail,
    subject: "VERIFY YOUR ACCOUNT",
    html: output,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lasuEmail: user.lasuEmail,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route       PUT api/users/activate/:token
// @dec         Activate user account
// @access      Private
const activateUser = asyncHandler(async (req, res) => {
  const token = req.params.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decodedToken) {
      // err
      if (err) {
        res.status(404);
        throw new Error("Could not find user with that email address");
      }
      const { id } = decodedToken;
      User.findById(id).then((user) => {
        if (!user) {
          res.status(404);
          throw new Error("Could not find user with that email address");
        }

        if (user && !user.isActive) {
          user.isActive = true;
          user.save().then((updatedUser) => {
            res.json({ success: true, updatedUser });
          });
        } else {
          res.status(400);
          throw new Error("Your email has already been confirmed");
        }
      });
    });
    // const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log("jggjg" + decodedToken);
    // if (!decodedToken) {
    //   res.status(404);
    //   throw new Error("Could not find user with that email address");
    // }
    // const { id } = decodedToken;
    // const user = await User.findById(id);

    // if (!user) {
    //   res.status(404);
    //   throw new Error("Could not find user with that email address");
    // }

    // if (user && !user.isActive) {
    //   user.isActive = true;
    //   const updatedUser = await user.save();
    //   res.json({ success: true, message: "Your email is confirmed" });
    // } else {
    //   res.status(400);
    //   throw new Error("Your email has already been confirmed");
    // }
  } else {
    res.status(404);
    throw new Error("Server Error....");
  }
});

// @route       GET api/users/profile
// @dec         Get user profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      matricNumber: user.matricNumber,
      lasuEmail: user.lasuEmail,
      photo: user.photo,
      faculty: user.faculty,
      department: user.department,
      homeAddress: user.homeAddress,
      dateOfBirth: user.dateOfBirth,
      studentPhoneNumber: user.studentPhoneNumber,
      dadPhoneNumber: user.dadPhoneNumber,
      momPhoneNumber: user.momPhoneNumber,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @route       PUT api/users/profile
// @dec         Update user profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @route       GET api/users
// @dec         Get all users
// @access      Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// @route       DELETE api/users
// @dec         Delete a user
// @access      Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authUser,
  registerUser,
  activateUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
};
