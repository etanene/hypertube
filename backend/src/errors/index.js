function CustomError(message = 'Internal error!', status = 500) {
  this.message = message;
  this.status = status;
}

module.exports = {
  CustomError,
};
