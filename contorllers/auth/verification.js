const User = require('../../models/user');

async function verification(req, res, next) {
    const { token } = req.params;

    try {
        const user = await User.findOne({ verificationToken: token }).exec();

        if (user === null) {
            return res.status(404).send({ message: "User not found" });
        }

        await User.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: null
        });

        res.status(200).send({ message: "Verification successful" });
    } catch (error) {
        next(error)
    }
};

module.exports = verification;