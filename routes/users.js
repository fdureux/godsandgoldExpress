const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  getUsersFromGodId,
} = require("../controllers/users");

const router = express.Router();

router.get("/", (req, res) => {
  getAllUsers(req, res);
});

router.post("/", (req, res) => {
  createUser(req, res);
});

router.get("/filters/id/:id", (req, res) => {
  getUser(req, res, "id");
});

router.get("/filters/name/:name", (req, res) => {
  getUser(req, res, "name");
});

router.get("gods/:godId", (req, res) => {
  getUsersFromGodId(req, res);
});

module.exports = router;
