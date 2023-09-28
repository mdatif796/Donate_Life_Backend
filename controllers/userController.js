const User = require("../models/user");
const jwt = require("jsonwebtoken");
const env = require("../config/environment");

module.exports.healthCheck = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "health check success",
  });
};

module.exports.createUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "password and confirm_password should be matched",
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      user = await User.create({
        name: req.body.name[0].toUpperCase() + req.body.name.substr(1),
        email: req.body.email,
        password: req.body.password,
        city: req.body.city[0].toUpperCase() + req.body.city.substr(1),
        state: req.body.state[0].toUpperCase() + req.body.state.substr(1),
        bloodGroup: req.body.bloodGroup,
        contact: req.body.contact,
        profileImg: req.body.profileImg,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.logIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not exist",
      });
    }
    if (user.password === req.body.password) {
      return res.status(201).json({
        success: true,
        message: "successfully logged in the user",
        jwt_token: jwt.sign(user.toJSON(), env.JWTSECRETKEY),
        user: user,
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getAuthenticatedUser = async (req, res) => {
  try {
    // get jwt token from request headers
    const token = req.headers.authorization?.split(" ")[1];
    // if token not exist
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token needed",
      });
    }
    // extract user from jwt token
    let user = jwt.verify(token, env.JWTSECRETKEY);

    return res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getDonor = async (req, res) => {
  try {
    // get jwt token from request headers
    const token = req.headers.authorization?.split(" ")[1];
    // if token not exist
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token needed",
      });
    }
    // extract user from jwt token
    let user = jwt.verify(token, env.JWTSECRETKEY);
    const { state, city, bloodGroup } = req.body;
    let query = {};
    if (state) {
      query.state = state;
    }
    if (city) {
      query.city = city;
    }
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }
    query._id = { $ne: user._id };
    let donor = await User.find(query).select("-password");
    return res.status(201).json({
      donor: donor,
      success: true,
      message: "donor returned",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
