const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const User = require("../models/userModel");
const FlatOne = require("../models/flatOneModel");
const FlatTwo = require("../models/flatTwoModel");
const RoomOne = require("../models/roomOneModel");
const RoomTwo = require("../models/roomTwoModel");

// @route       POST api/hostels/flatone/create
// @dec         Create Flat One
// @access      Private/Admin
const createFlatOne = asyncHandler(async (req, res) => {
  const { roomOne, roomTwo } = req.body;

  const assignedRoomOne = await RoomOne.findById(roomOne);
  const assignedRoomTwo = await RoomTwo.findById(roomTwo);

  if (!assignedRoomOne) {
    res.status(404);
    throw new Error("Room one not found");
  }
  if (!assignedRoomTwo) {
    res.status(404);
    throw new Error("Room two not found");
  }

  if (assignedRoomOne.hasFlat) {
    res.status(400);
    throw new Error("This Room one already has a flat");
  }
  if (assignedRoomTwo.hasFlat) {
    res.status(400);
    throw new Error("This Room two already has a flat");
  }

  if (roomOne && roomTwo) {
    const createdFlatOne = await FlatOne.create({
      roomOne,
      roomTwo,
    });

    assignedRoomOne.hasFlat = true;
    assignedRoomTwo.hasFlat = true;

    await assignedRoomOne.save();
    await assignedRoomTwo.save();

    res.json(createdFlatOne);
  } else {
    res.status(400);
    throw new Error("Room one or Room two is required");
  }
});

// @route       GET api/hostels/flatone/
// @dec         Get all Flat One
// @access      Private/Admin
const getAllFlatOne = asyncHandler(async (req, res) => {
  const allFlatOne = await FlatOne.find()
    .populate({ path: "roomOne", model: "roomOne" })
    .populate({ path: "roomTwo", model: "roomTwo" });

  res.json(allFlatOne);
});

// @route       GET api/hostels/flatone/:id
// @dec         Get a Flat One by ID
// @access      Private
const getFlatOneById = asyncHandler(async (req, res) => {
  const aFlatOne = await FlatOne.findById(req.params.id)
    .populate({ path: "roomOne", model: "roomOne" })
    .populate({ path: "roomTwo", model: "roomTwo" });

  if (!aFlatOne) {
    res.status(484);
    throw new Error("Flat not found");
  } else {
    res.json(aFlatOne);
  }
});

// @route       PUT api/hostels/flatone/:id
// @dec         Update a Flat One by ID
// @access      Private
const updateFlatOneById = asyncHandler(async (req, res) => {
  const { roomOne, roomTwo } = req.body;
  const aFlatOne = await FlatOne.findById(req.params.id);

  if (aFlatOne) {
    aFlatOne.roomOne = roomOne;
    aFlatOne.roomTwo = roomTwo;

    const updatedFlatOne = await aFlatOne.save();
    res.status(201).json(updatedFlatOne);
  } else {
    res.status(484);
    throw new Error("Flat not found");
  }
});

// @route       DELETE api/hostels/flatone/:id
// @dec         Delete a Flat One by ID
// @access      Private/Admin
const deleteFlatOneById = asyncHandler(async (req, res) => {
  const aFlatOne = await FlatOne.findById(req.params.id);

  if (aFlatOne) {
    await aFlatOne.remove();
    res.json({ message: "Flat removed" });
  } else {
    res.status(484);
    throw new Error("Flat not found");
  }
});

// @route       POST api/hostels/flattwo/create
// @dec         Create Flat Two
// @access      Private/Admin
const createFlatTwo = asyncHandler(async (req, res) => {
  const { roomOne, roomTwo } = req.body;

  const assignedRoomOne = await RoomOne.findById(roomOne);
  const assignedRoomTwo = await RoomTwo.findById(roomTwo);

  if (!assignedRoomOne) {
    res.status(404);
    throw new Error("Room one not found");
  }
  if (!assignedRoomTwo) {
    res.status(404);
    throw new Error("Room two not found");
  }

  if (assignedRoomOne.hasFlat) {
    res.status(400);
    throw new Error("This Room one already has a flat");
  }
  if (assignedRoomTwo.hasFlat) {
    res.status(400);
    throw new Error("This Room two already has a flat");
  }

  if (roomOne && roomTwo) {
    const createdFlatTwo = await FlatTwo.create({
      roomOne,
      roomTwo,
    });

    assignedRoomOne.hasFlat = true;
    assignedRoomTwo.hasFlat = true;

    await assignedRoomOne.save();
    await assignedRoomTwo.save();

    res.json(createdFlatTwo);
  } else {
    res.status(400);
    throw new Error("Room one or Room two is required");
  }
});

// @route       GET api/hostels/flattwo/
// @dec         Get all Flat Two
// @access      Private/Admin
const getAllFlatTwo = asyncHandler(async (req, res) => {
  const allFlatTwo = await FlatTwo.find()
    .populate({ path: "roomOne", model: "roomOne" })
    .populate({ path: "roomTwo", model: "roomTwo" });

  res.json(allFlatTwo);
});

// @route       GET api/hostels/flattwo/:id
// @dec         Get a flat Two by ID
// @access      Private
const getFlatTwoById = asyncHandler(async (req, res) => {
  const aFlatTwo = await FlatTwo.findById(req.params.id)
    .populate({ path: "roomOne", model: "roomOne" })
    .populate({ path: "roomTwo", model: "roomTwo" });

  if (!aFlatTwo) {
    res.status(484);
    throw new Error("Flat not found");
  } else {
    res.json(aFlatTwo);
  }
});

// @route       PUT api/hostels/flattwo/:id
// @dec         Update a Flat Two by ID
// @access      Private
const updateFlatTwoById = asyncHandler(async (req, res) => {
  const { roomOne, roomTwo } = req.body;
  const aFlatTwo = await FlatTwo.findById(req.params.id);

  if (aFlatTwo) {
    aFlatTwo.roomOne = roomOne;
    aFlatTwo.roomTwo = roomTwo;

    const updatedFlatTwo = await aFlatTwo.save();
    res.status(201).json(updatedFlatTwo);
  } else {
    res.status(484);
    throw new Error("Flat not found");
  }
});

// @route       DELETE api/hostels/flattwo/:id
// @dec         Delete a Flat Two by ID
// @access      Private/Admin
const deleteFlatTwoById = asyncHandler(async (req, res) => {
  const aFlatTwo = await FlatTwo.findById(req.params.id);

  if (aFlatTwo) {
    await aFlatTwo.remove();
    res.json({ message: "Flat removed" });
  } else {
    res.status(484);
    throw new Error("Flat not found");
  }
});

module.exports = {
  createFlatOne,
  getAllFlatOne,
  getFlatOneById,
  updateFlatOneById,
  deleteFlatOneById,
  createFlatTwo,
  getAllFlatTwo,
  getFlatTwoById,
  updateFlatTwoById,
  deleteFlatTwoById,
};
