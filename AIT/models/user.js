var crypto = require('crypto');
var async = require('async'); // - т.е чтобы не писать просто на колбэках + доп.возможности(у нас waterfall)
var util = require('util');

var firebase = require('firebase');




// Своя собственная ошибка(для моего вывода)
function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
