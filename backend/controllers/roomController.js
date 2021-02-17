const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const User = require("../models/userModel");
const RoomOne = require("../models/roomOneModel");
const RoomTwo = require("../models/roomTwoModel");
const FlatOne = require("../models/flatOneModel");

// @route       POST api/hostels/roomone/create
// @dec         Create Room One
// @access      Private/Admin
const createRoomOne = asyncHandler(async (req, res) => {
  const { price } = req.body;

  if (price) {
    const createdRoomOne = await RoomOne.create({
      price,
    });
    res.json(createdRoomOne);
  } else {
    res.status(400);
    throw new Error("Error Creating Room");
  }
});

// @route       GET api/hostels/roomone/
// @dec         Get all Room One
// @access      Private/Admin
const getAllRoomOne = asyncHandler(async (req, res) => {
  const allRoomOne = await RoomOne.find()
    .populate({ path: "occupantOne", model: "occupantOne" })
    .populate({ path: "occupantTwo", model: "occupantTwo" });

  res.json(allRoomOne);
});

// @route       GET api/hostels/roomone/notassigned
// @dec         Get all Not Assigned Room One
// @access      Private/Admin
const getAllNotAssignedRoomOne = asyncHandler(async (req, res) => {
  const allNotAssignedRoomOne = await RoomOne.find({ hasFlat: false });

  res.json(allNotAssignedRoomOne);
});

// @route       GET api/hostels/roomone/:id
// @dec         Get a Room One by ID
// @access      Private
const getRoomOneById = asyncHandler(async (req, res) => {
  const aRoomOne = await RoomOne.findById(req.params.id).populate(
    "occupantOne occupantTwo"
  );

  if (!aRoomOne) {
    res.status(484);
    throw new Error("Room not found");
  } else {
    res.json(aRoomOne);
  }
});

// @route       PUT api/hostels/roomone/:id
// @dec         Update a Room One by ID
// @access      Private
const updateRoomOneById = asyncHandler(async (req, res) => {
  const { price } = req.body;
  const aRoomOne = await RoomOne.findById(req.params.id);

  if (aRoomOne) {
    aRoomOne.price = price;

    const updatedRoomOne = await aRoomOne.save();
    res.status(201).json(updatedRoomOne);
  } else {
    res.status(484);
    throw new Error("Room not found");
  }
});

// @route       DELETE api/hostels/roomone/:id
// @dec         Delete a Room One by ID
// @access      Private/Admin
const deleteRoomOneById = asyncHandler(async (req, res) => {
  const aRoomOne = await RoomOne.findById(req.params.id);

  if (aRoomOne) {
    await aRoomOne.remove();
    res.json({ message: "Room removed" });
  } else {
    res.status(484);
    throw new Error("Room not found");
  }
});

// @route       POST api/hostels/roomtwo/create
// @dec         Create Room Two
// @access      Private/Admin
const createRoomTwo = asyncHandler(async (req, res) => {
  const { price } = req.body;

  if (price) {
    const createdRoomTwo = await RoomTwo.create({
      price,
    });
    res.json(createdRoomTwo);
  } else {
    res.status(400);
    throw new Error("Error Creating Room");
  }
});

// @route       GET api/hostels/roomtwo/
// @dec         Get all Room Two
// @access      Private/Admin
const getAllRoomTwo = asyncHandler(async (req, res) => {
  const allRoomTwo = await RoomTwo.find().populate("occupantOne occupantTwo");

  res.json(allRoomTwo);
});

// @route       GET api/hostels/roomone/notassigned
// @dec         Get all Not Assigned Room Two
// @access      Private/Admin
const getAllNotAssignedRoomTwo = asyncHandler(async (req, res) => {
  const allNotAssignedRoomTwo = await RoomTwo.find({ hasFlat: false });

  res.json(allNotAssignedRoomTwo);
});

// @route       GET api/hostels/roomtwo/:id
// @dec         Get a Room Two by ID
// @access      Private
const getRoomTwoById = asyncHandler(async (req, res) => {
  const aRoomTwo = await RoomTwo.findById(req.params.id).populate(
    "occupantOne occupantTwo"
  );

  if (!aRoomTwo) {
    res.status(484);
    throw new Error("Room not found");
  } else {
    res.json(aRoomTwo);
  }
});

// @route       PUT api/hostels/roomtwo/:id
// @dec         Update a Room Two by ID
// @access      Private
const updateRoomTwoById = asyncHandler(async (req, res) => {
  const { price } = req.body;
  const aRoomTwo = await RoomTwo.findById(req.params.id);

  if (aRoomTwo) {
    aRoomTwo.price = price;

    const updatedRoomTwo = await aRoomTwo.save();
    res.status(201).json(updatedRoomTwo);
  } else {
    res.status(484);
    throw new Error("Room not found");
  }
});

// @route       DELETE api/hostels/roomtwo/:id
// @dec         Delete a Room Two by ID
// @access      Private/Admin
const deleteRoomTwoById = asyncHandler(async (req, res) => {
  const aRoomTwo = await RoomTwo.findById(req.params.id);

  if (aRoomTwo) {
    await aRoomTwo.remove();
    res.json({ message: "Room removed" });
  } else {
    res.status(484);
    throw new Error("Room not found");
  }
});

module.exports = {
  createRoomOne,
  getAllRoomOne,
  getAllNotAssignedRoomOne,
  getRoomOneById,
  updateRoomOneById,
  deleteRoomOneById,
  createRoomTwo,
  getAllRoomTwo,
  getAllNotAssignedRoomTwo,
  getRoomTwoById,
  updateRoomTwoById,
  deleteRoomTwoById,
};
