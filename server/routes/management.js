const express = require("express");
const managementRouter = express.Router();
const { getAdmins, getUserPerformance } = require("../controller/management");

managementRouter.get("/admins", getAdmins);
managementRouter.get("/performance/:id", getUserPerformance);


module.exports = {
  managementRouter,
};
