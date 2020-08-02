function AuthException(message, status = 400) {
  this.message = message;
  this.name = 'Auth';
  this.status = status;
}

function ValidateException(message) {
  this.message = message;
  this.name = 'Validate';
  this.status = 400;
}

function UserException(message) {
  this.message = message;
  this.name = 'User';
  this.status = 400;
}

function CommentException(message) {
  this.message = message;
  this.name = 'Comment';
  this.status = 400;
}

function InternalError(message) {
  this.message = message || 'Internal Error!';
  this.name = 'Internal';
  this.status = 500;
}

module.exports = {
  AuthException,
  ValidateException,
  UserException,
  InternalError,
  CommentException,
};
