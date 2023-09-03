const bcrypt = require('bcrypt');

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

        res.status(201).send({ message: "Registration successful" });
    } catch (error) {
        next(error);
    }
};

module.exports = register;