const Joi = require('joi');
const { password, objectId,email } = require('./custom.validation');

const addUser = {
  body: Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    phone: Joi.number().required(),
    profileimageurl: Joi.optional(),
    email: Joi.string().required().custom(email),
    password: Joi.string().required().custom(password),
  }),
};

// Change Password
const changePassword = {
  body: Joi.object().keys({
    email: Joi.string().required().messages({
      'string.email': 'Not a valid email address.',
      'string.empty': 'Email is required.',
    }),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().custom(password),
  }),
};


// Update User
const updateUser = {
  body: Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().required().custom(email),
    phone: Joi.string().required(),
    profileimageurl: Joi.optional(),
  }),
};


// Update User name
const updateUserName = {
  body: Joi.object().keys({
    fname: Joi.string().optional(),
    lname: Joi.string().optional(),
    email: Joi.string().optional().custom(email),
    phone: Joi.string().optional(),
    password: Joi.string().optional(),
    profileimageurl: Joi.optional(),
  }),
  params: Joi.object().keys({
    id:Joi.string().required()
  })
};

// Block User
const blockUser = {
  body: Joi.object().keys({
    status: Joi.boolean().required(),
  }),
};


// Get User Data
const userData = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};


const updatepwd = {
  body: Joi.object().keys({
    password: Joi.string().required(),
  }),
  params: Joi.object().keys({
    id:Joi.string().required()
  })
};


const updateImage = {
  body: Joi.object().keys({
    profileimageurl: Joi.required(),
  }),
  params: Joi.object().keys({
    id:Joi.string().required()
  })
};


module.exports = {
  changePassword,
  updateUser,
  blockUser,
  addUser,
  userData,
  updateUserName,
  updatepwd,
  updateImage
};
