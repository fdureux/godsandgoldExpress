const express = require("express");
const { makeResponse } = require("../util/routeHelper");
const {
  getAllUsers,
  getUser,
  createUser,
  getUsersFromGodId,
} = require("../controllers/users");

const router = express.Router();

router.get("/", (request, response) => {
  const result = getAllUsers();
  makeResponse(response, result);
});

router.post("/", (request, response) => {
  const result = createUser(
    request.body.name,
    request.body.password,
    request.body.email
  );
  makeResponse(response, result);
});

router.get("/filters/id/:id", (request, response) => {
  const result = getUser(["id", request.params.id]);
  makeResponse(response, result);
});

router.get("/filters/name/:name", (request, response) => {
  const result = getUser(["name", request.params.name]);
  makeResponse(response, result);
});

router.get("gods/:godId", (request, response) => {
  const result = getUsersFromGodId(request.params.godId);
  makeResponse(response, result);
});

module.exports = router;
