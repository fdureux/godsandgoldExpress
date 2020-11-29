// Reminder how to decorate:
//
// function responseDecorator(wrapped) {
//   return function () {
//     const result = wrapped.apply(this, arguments);
//     makeResponse(arguments[1], result);
//   };
// }

const makeResponse = (response, result) => {
  if (result.error) {
    handleError(response, result.error);
  } else {
    ok(result.json);
  }
};

const handleError = (response, error) => {
  console.log(error);
  response.sendStatus(500);
};

const ok = (response, json) => {
  response.status(200).json(json);
};

module.exports = makeResponse;
