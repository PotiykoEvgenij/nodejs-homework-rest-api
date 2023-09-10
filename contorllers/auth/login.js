const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

async function login(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (user === null) {
            return res.status(401).send({ message: "Email or password is incorrect" });
        }

        if (user.verify === false) {
            return res.status(401).send({ message: "Please verify your email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch !== true) {
            return res.status(401).send({ message: "Email or password is incorrect" });
        }

        const token = jwt.sign({ id: user._id, email: user.email, subscription: user.subscription }, process.env.JWT_SECRET, { expiresIn: 1800 });
        console.log(token);

        await User.findByIdAndUpdate(user._id, { token });

        return res.status(200).send({ token });

    } catch (error) {
        next(error);
    }

    res.end("login");
};

module.exports = login;
    