const express = require("express");
const godsRoutes = require("./gods");
const usersRoutes = require("./users");
const offeringsRoutes = require("./offerings");

const router = express.Router();

router.use("/gods", godsRoutes);
router.use("/users", usersRoutes);
router.use("/offerings", offeringsRoutes);

module.exports = router;
