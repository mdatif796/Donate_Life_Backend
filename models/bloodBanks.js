const mongoose = require("mongoose");

const BloodBankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
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
    contactNumber: {
      type: String,
      required: true,
    },
    bloods: [{}],
  },
  {
    timestamps: true,
  }
);

const BloodBank = mongoose.model("BloodBank", BloodBankSchema);

module.exports = BloodBank;
