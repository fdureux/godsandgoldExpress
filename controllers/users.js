const pool = require("../config");

const getAllUsers = () => {
  pool.query("SELECT * FROM user", (error, users) => {
    if (error) {
      return { error };
    }
    return { json: users };
  });
};

const createUser = (name, password, email) => {
  pool.getConnection((_, connection) => {
    connection.query(
      "INSERT INTO user (name, password, email) VALUES (?,?,?)",
      [name, password, email],
      (error, _) => {
        if (error) {
          return { error };
        }
        connection.query(
          "SELECT LAST_INSERT_ID()",
          [],
          (select_error, results) => {
            if (select_error) {
              return { error: select_error };
            }
            return { json: { id: results[0]["LAST_INSERT_ID()"] } };
          }
        );
      }
    );
  });
};

const getUser = (filter) => {
  pool.query("SELECT * FROM user WHERE ? = ?", filter, (error, user) => {
    if (error) {
      return { error };
    }
    return { json: user };
  });
};

const getUsersFromGodId = (godId) => {
  pool.query(
    "SELECT * FROM user INNER JOIN offering ON user.id = offering.user_id WHERE offering.god_id = ?",
    godId,
    (error, godUsers) => {
      if (error) {
        return { error };
      }
      return { json: godUsers };
    }
  );
};

/* DECORATOR - TO AVOID TO REPEAT THE FUNCTION makeResponse
const responseDecorator = (route, arguments) {
  const result = route(...arguments)
  makeResponse(result)
}
*/

exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.createUser = createUser;
exports.getUsersFromGodId = getUsersFromGodId;
