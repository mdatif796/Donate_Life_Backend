const Hospital = require("../models/hospital");

module.exports.createHospital = async (req, res) => {
  await Hospital.create(req.body);
  return res.status(201).json({
    success: true,
  });
};

module.exports.getHospital = async (req, res) => {
  try {
    const { state, city, localAddress } = req.body;
    let query = {};
    if (state) {
      query.state = state;
    }
    if (city) {
      query.city = city;
    }
    if (localAddress) {
      query.localAddress = localAddress;
    }
    let hospitals = await Hospital.find(query);
    return res.status(201).json({
      success: true,
      hospitals: hospitals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
