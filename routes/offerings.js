const express = require("express");
const { makeResponse } = require("../util/routeHelper");
const {
  getAllOfferings,
  createOffering,
  getOfferingByGod,
  getOfferingByUser,
  getOfferingByGodAndUser,
} = require("../controllers/offerings");

const router = express.Router();

router.get("/", (request, response) => {
  const result = getAllOfferings();
  makeResponse(response, result);
});

router.post("/", (request, response) => {
  const result = createOffering(
    request.body.user_id,
    request.body.god_id,
    request.body.description,
    request.body.tribute,
    request.body.date,
    request.body.address,
    request.body.status
  );
  makeResponse(response, result);
});

router.get("/gods/:idGod", (request, response) => {
  const result = getOfferingByGod(request.params.idGod);
  makeResponse(response, result);
});

router.get("/users/:idUser", (request, response) => {
  const result = getOfferingByUser(request.params.idUser);
  makeResponse(response, result);
});

router.get("/gods/:idGod/users/:idUser", (request, response) => {
  const result = getOfferingByGodAndUser([
    request.params.idGod,
    request.params.idUser,
  ]);
  makeResponse(response, result);
});

module.exports = router;
