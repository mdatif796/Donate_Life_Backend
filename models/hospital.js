const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    localAddress: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    totalIcuBeds: {
      type: Number,
      required: true,
    },
    availableIcuBeds: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hospital = mongoose.model("Hospital", HospitalSchema);

module.exports = Hospital;
