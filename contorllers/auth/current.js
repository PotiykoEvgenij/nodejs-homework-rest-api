const User = require('../../models/user');

async function current(req, res, next) {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).send({message: "Not autorized"})
        }

        res.status(200).send({
            email: user.email,
            subscription: user.subscription,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = current;