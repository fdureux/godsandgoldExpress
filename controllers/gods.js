const pool = require("../config");

const getAllGods = () => {
  pool.query("SELECT * FROM god", (error, gods) => {
    if (error) {
      return { error };
    }
    return { json: gods };
  });
};

const getGodById = (id) => {
  pool.query("SELECT * FROM god WHERE id = ?", id, (error, god) => {
    if (error) {
      return { error };
    }
    return { json: god };
  });
};

exports.getAllGods = getAllGods;
exports.getGodById = getGodById;
