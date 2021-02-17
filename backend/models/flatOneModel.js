const mongoose = require("mongoose");

const flatOneSchema = mongoose.Schema(
  {
    roomOne: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomOne",
    },
    roomTwo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomTwo",
    },
  },

  {
    timestamps: true,
  }
);

const FlatOne = mongoose.model("flatOne", flatOneSchema);

module.exports = FlatOne;
