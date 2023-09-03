const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

async function register(req, res, next) {
    const { password, email, subscription } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (user !== null) {
            return res.status(409).send({ message: "User already exist" });
        };

        const passwordHash = await bcrypt.hash(password, 10);

        await User.create({ password: passwordHash, email, subscription });

        // const token = jwt.sign({ id: user._id, email: user.email, subscription: user.subscription }, process.env.JWT_SECRET, { expiresIn: 1800 });
        // console.log(token);

        res.status(201).send({ message: "Registration successful" });
    } catch (error) {
        next(error);
    }
};

module.exports = register;