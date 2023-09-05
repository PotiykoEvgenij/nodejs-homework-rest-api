const User = require('../../models/user');

async function logout(req, res, next) {
    try {
        await User.findByIdAndUpdate(req.user.id, { token: null });

        // res.send({ message: "You are successfully logged out" });
        res.status(202).send({ message: "You are successfully logged out" });
    } catch (error) {
        next(error);
    }
}

module.exports = logout;