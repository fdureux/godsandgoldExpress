const pool = require("../config");
const handleError = require("../util/errorHandler");

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM user", (err, results) => {
    if (err) {
      handleError(res, err);
    } else {
      res.json(results);
    }
  });
};

const getUser = (req, res, filter) => {
  const filterValue = req.params[filter];
  pool.query(
    "SELECT * FROM user WHERE ? = ?",
    [filter, filterValue],
    (err, results) => {
      if (err) {
        handleError(res, err);
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
};

const createUser = (req, res) => {
  const { name, password, email } = req.body;
  pool.getConnection((err, connection) => {
    connection.query(
      "INSERT INTO user (name, password, email) VALUES (?,?,?)",
      [name, password, email],
      (err, _) => {
        if (err) {
          handleError(res, err);
        } else {
          connection.query(
            "SELECT LAST_INSERT_ID()",
            [],
            (select_err, results) => {
              if (select_err) {
                handleError(res, select_err);
              } else {
                res.status(200).send({ id: results[0]["LAST_INSERT_ID()"] });
              }
            }
          );
        }
      }
    );
  });
};

const getUsersFromGodId = (req, res) => {
  const godId = req.params.godId;
  pool.query(
    "SELECT * FROM user INNER JOIN offering ON user.id = offering.user_id WHERE offering.god_id = ?",
    [godId],
    (err, results) => {
      if (err) {
        handleError(res, err);
      } else {
        res.status(200).json(results);
      }
    }
  );
};

exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.createUser = createUser;
exports.getUsersFromGodId = getUsersFromGodId;
