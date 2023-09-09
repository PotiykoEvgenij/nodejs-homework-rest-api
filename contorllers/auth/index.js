const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const avatar = require('./avatar');
const verification = require('./verification');
const reVerification = require('./reVerification');

module.exports = {
    register,
    login,
    logout,
    current,
    avatar,
    verification,
    reVerification,
};