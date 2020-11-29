const express = require("express");
const { getAllGods, getGodById } = require("../controllers/gods");
const makeResponse = require("../util/routeHelper");

const router = express.Router();

router.get("/", (_, response) => {
  const result = getAllGods();
  makeResponse(response, result);
});

router.get("/:id", (request, response) => {
  const result = getGodById(request.params.id);
  makeResponse(response, result);
});

module.exports = router;
