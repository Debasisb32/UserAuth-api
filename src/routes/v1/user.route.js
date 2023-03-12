const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');


const router = express.Router();

// router.use(auth('manageProfile'));

router.get('/user/:userId', validate(userValidation.userData), userController.getUserData);
router.delete('/user/:userId', validate(userValidation.userData), userController.deleteUser);
router.patch('/update-user-name/:id', validate(userValidation.updateUserName), userController.updateUserName);
router.patch('/update-user-pwd/:id', validate(userValidation.updatepwd), userController.updateUserPwd);
router.patch('/update-user-image/:id', validate(userValidation.updateImage), userController.updateUserImage);


module.exports = router;
