const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (typeof authHeader !== 'string') {
        return res.status(401).send({ message: "No token provided" });
    }

    const [bearer, token] = authHeader.split(" ", 2);

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).send({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            if (err.name === "JsonWebTokenError" || err.name === 'TokenExpiredError') {
                return res.status(401).send({ message: "Token Error" });
            }

            return next(err);
        }

        req.user = {
            id: decode.id,
            email: decode.email,
            subscription: decode.subscription,
            // userId: decode.Id,
        };

        next();
    });


};

module.exports = auth;