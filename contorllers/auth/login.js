const bcrypt = require('bcrypt');

const User = require('../../models/user');

async function login(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (user === null) {
            return res.status(401).send({ message: "Email or password is incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch !== true) {
            return res.status(401).send({ message: "Email or password is incorrect" });
        }

        return res.status(200).send({ token: "TOKEN" });
        console.log(isMatch);

    } catch (error) {
        next(error);
    }

    res.end("login");
};

module.exports = login;
    