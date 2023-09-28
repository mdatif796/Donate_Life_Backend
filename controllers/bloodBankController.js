const BloodBank = require("../models/bloodBanks");

module.exports.createBloodBank = async (req, res) => {
  await BloodBank.create(req.body);
  return;
  //   console.log(req.body);
};

module.exports.getBloodBank = async (req, res) => {
  try {
    const { state, city, bloodGroup } = req.body;
    let query = {};
    if (state) {
      query.state = state;
    }
    if (city) {
      query.city = city;
    }
    if (bloodGroup) {
      query.bloods = {
        $elemMatch: {
          group: bloodGroup,
          unit: { $gte: "1" },
        },
      };
    }
    let bloodBanks = await BloodBank.find(query);
    return res.status(201).json({
      success: true,
      bloodBanks: bloodBanks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
