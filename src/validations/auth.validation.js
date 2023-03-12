const Joi = require('joi');
const { password,email } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().required().custom(email),
    password: Joi.string().required().custom(password),
    dob: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().custom(email),
  }),
};



// Reset Password
const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    token: Joi.string().required(),
  })
};

const verifyEmail = {
  param: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail
};
