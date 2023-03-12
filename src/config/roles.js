const roles = ['user', 'admin'];
const roleRights = new Map();
roleRights.set(roles[0], ['manageProfile']);
roleRights.set(roles[1], ['getUsers','manageAdmin','manageProfile']);

module.exports = {
  roles,
  roleRights,
};
