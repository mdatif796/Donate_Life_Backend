const express = require("express");

const router = express.Router();
const userController = require("../../controllers/userController");
const bloodBankController = require("../../controllers/bloodBankController");
const hospitalController = require("../../controllers/hospitalController");

router.post("/health-check", userController.healthCheck);
router.post("/create-user", userController.createUser);
router.post("/authenticate", userController.logIn);
router.post("/get-authenticated-user", userController.getAuthenticatedUser);
router.post("/get-donor", userController.getDonor);
router.post("/create-blood-bank", bloodBankController.createBloodBank);
router.post("/get-blood-bank", bloodBankController.getBloodBank);
router.post("/create-hospital", hospitalController.createHospital);
router.post("/get-hospital", hospitalController.getHospital);

module.exports = router;
