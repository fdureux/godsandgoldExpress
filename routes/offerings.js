const express = require("express");
const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM gift", (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.post("/", (req, res) => {
  const {
    user_id,
    god_id,
    request,
    offering,
    date,
    adress,
    status,
    user_name,
  } = req.body;
  connection.query(
    "INSERT INTO gift (user_id, god_id, request, offering, date, adress, status, user_name) VALUES (?,?,?,?,?,?,?,?)",
    [user_id, god_id, request, offering, date, adress, status, user_name],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a member");
      } else {
        res.status(200).send("New member created");
      }
    }
  );
});

router.get("/gods/:idGod", (req, res) => {
  const { idGod } = req.params;
  connection.query(
    "SELECT go.name, go.picture, g.request, g.offering, g.date, g.status FROM gift as g JOIN god as go ON go.id = g.god_id WHERE god_id = ?",
    [idGod],
    (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    }
  );
});

router.get("/gods/:idGod/users/:idUser", (req, res) => {
  const { idGod } = req.params;
  connection.query(
    "SELECT * FROM gift WHERE gift.god_id = ? AND gift.user_id = ?",
    [idGod, idUser],
    (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    }
  );
});
// router.get("/users/:idUser", (req, res) => {
//   const { idGod, idUser } = req.params;
//   connection.query(
//     "SELECT go.name, go.picture, g.request, g.offering, g.date, g.status FROM gift as g JOIN user as u ON user.id = u.user_id WHERE g.user_id = ?",
//     [idGod, idUser],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         res.sendStatus(500);
//       } else {
//         res.json(results);
//       }
//     }
//   );
// });

module.exports = router;
