const handleError = (res, err) => {
  console.log(err);
  res.sendStatus(500);
};

module.exports = handleError;
