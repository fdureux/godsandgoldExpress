const pool = require("../config");

const getAllOfferings = () => {
  pool.query("SELECT * FROM offering", (error, offerings) => {
    if (error) {
      return { error };
    }
    return { json: offerings };
  });
};

const createOffering = (
  user_id,
  god_id,
  description,
  tribute,
  date,
  address,
  status
) => {
  pool.getConnection((_, connection) => {
    connection.query(
      "INSERT INTO gift (user_id, god_id, description, tribute, date, address, status) VALUES (?,?,?,?,?,?,?)",
      [user_id, god_id, description, tribute, date, address, status],
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

const getOfferingByGod = (idGod) => {
  connection.query(
    `SELECT god.name, god.picture, off.description, off.tribute, off.date, off.status
    FROM offering as off
    JOIN god ON god.id = off.god_id
    WHERE god_id = ?`,
    idGod,
    (error, offering) => {
      if (error) {
        return { error };
      }
      return { json: offering };
    }
  );
};

const getOfferingByUser = (idUser) => {
  connection.query(
    "SELECT * FROM offering WHERE user_id = ? ",
    idUser,
    (error, offerings) => {
      if (error) {
        return { error };
      }
      return { json: offerings };
    }
  );
};

const getOfferingByGodAndUser = (idGod, idUser) => {
  connection.query(
    "SELECT * FROM offering WHERE god_id = ? AND user_id = ?",
    [idGod, idUser],
    (error, offerings) => {
      if (error) {
        return { error };
      }
      return { json: offerings };
    }
  );
};

exports.getAllOfferings = getAllOfferings;
exports.createOffering = createOffering;
exports.getOfferingByGod = getOfferingByGod;
exports.getOfferingByUser = getOfferingByUser;
exports.getOfferingByGodAndUser = getOfferingByGodAndUser;
