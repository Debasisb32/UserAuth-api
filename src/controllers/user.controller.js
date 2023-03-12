const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

/* Delete Account */
const deleteAccount = catchAsync(async (req, res) => {
  const results = await userService.deleteUserById(req.user.userId);
  if (results) {
    res.status(httpStatus.OK).send({
      serverResponse: {
        code: httpStatus.OK,
        message: 'Your account deleted successfully',
      },
    });
  }else{
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
});

/* Edit Admin Profile */
const editProfile = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.status(httpStatus.OK).send({
    serverResponse: {
      code: httpStatus.OK,
      message: 'Success',
    },
    userData: user
  });
});

/* Update Admin Profile */
const updateProfile = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user.id, req.body);
  res.status(httpStatus.OK).send({
    serverResponse: {
      code: httpStatus.OK,
      message: 'Profile updated successfullly',
    },
    result: {
      userData: user,
    },
  });
});

// Change Password
const changePassword = catchAsync(async (req, res) => {
  await userService.changePassword(req.body.email, req.body.oldPassword, req.body.newPassword);
  res.status(httpStatus.OK).send({
    serverResponse: {
      code: httpStatus.OK,
      message: 'Your password has been changed successfully.',
    },
  });
});

/* Add user by admin */
const addUsers = catchAsync(async (req, res) => {
  if (req.user.role == 'admin') {
    const user = await userService.addUserByAdmin(req.body);
    res.status(httpStatus.OK).send({
      serverResponse: {
        code: httpStatus.OK,
        message: 'User added successfully!',
      },
      result: {
        userData: user,
      },
    });
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'You dont have permission to manage users');
  }
});
// Get All User List
const getAllUserList = catchAsync(async (req, res) => {
  const userList = await userService.getAllUsersListData();
  res.status(httpStatus.OK).send({
    serverResponse: {
      code: httpStatus.OK,
      message: 'Success',
    },
      userData: userList,
  });
});

// Get User List
const getUserList = catchAsync(async (req, res) => {
  const current_page = req.params.current_page ? req.params.current_page : 1;
  const limit = req.params.limit ? req.params.limit : 10;
  const userList = await userService.getAllUsersList(current_page,limit);
  res.status(httpStatus.OK).send({
    serverResponse: {
      code: httpStatus.OK,
      message: 'Success',
    },
    userData: userList,
  });
});

// Edit User
const editUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.status(httpStatus.OK).send({
    serverResponse: {
      code: httpStatus.OK,
      message: 'Success',
    },
    result: {
      userData: user,
    },
  });
});

// Update User
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    serverResponse: {
      code: httpStatus.OK,
      message: 'User Data update successfullly',
    },
    result: {
      userData: user,
    },
  });
});

/* Delete User */
const deleteUser = catchAsync(async (req, res) => {
  const results = await userService.deleteUserById(req.params.userId);
  if (results) {
    res.status(httpStatus.OK).send({
      serverResponse: {
        code: httpStatus.OK,
        message: 'User deleted successfully',
      },
    });
  }else{
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
});

// Block User
const blockUser = catchAsync(async (req, res) => {
  const data = req.body;
  const user = await userService.blockUserById(req.params.userId, data);
  if (user) {
    res.status(httpStatus.OK).send({
      serverResponse: {
        code: httpStatus.OK,
         message: 'User Blocked Successfully',
      }
    });
  }else{
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
});



// Get User Data
const getUserData = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (user) {
    res.status(httpStatus.OK).send({
      serverResponse: {
        code: httpStatus.OK,
         message: 'User Data',
      },
      user
    });
  }else{
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
});


// Update User
const updateUserName = catchAsync(async (req, res) => {
  const user = await userService.updateUserNameById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    serverResponse: {
      code: httpStatus.OK,
      message: 'User Data update successfullly',
    },
    result: {
      userData: user,
    },
  });
});

const updateUserPwd = catchAsync(async (req, res) => {
  const user = await userService.updateUserPwdById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    serverResponse: {
      code: httpStatus.OK,
      message: 'User Data update successfullly',
    },
    result: {
      userData: user,
    },
  });
});



const updateUserImage = catchAsync(async (req, res) => {
  const user = await userService.updateImageById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    serverResponse: {
      code: httpStatus.OK,
      message: 'User Image update successfullly',
    },
  });
});



module.exports = {
  editProfile,
  updateProfile,
  deleteAccount,
  changePassword,
  addUsers,
  getUserList,
  getUserData,
  editUser,
  updateUser,
  deleteUser,
  getAllUserList,
  blockUser,
  updateUserName,
  updateUserPwd,
  updateUserImage
};
