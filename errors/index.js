exports.handleRouteErrors = (request, response, next) => {
  response.status(404).send({ msg: "Route Does Not Exist" });
};

exports.handleCustomErrors = (error, request, response, next) => {
  const { status, msg } = error;
  if (status) {
    response.status(status).send({ msg });
  } else {
    next(error);
  }
};

exports.handleServerErrors = (error, request, response, next) => {
  console.log(error);
  response.status(500).send("Internal Server Error");
};
