exports.handleRouteErrors = (request, response, next) => {
  response.status(404).send({ msg: "Route Does Not Exist" });
};

exports.handleServerErrors = (error, request, response, next) => {
  console.log(error);
  response.status(500).send("Internal Server Error");
};
