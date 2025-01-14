require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const User = require('../../models/user');
const sendEmail = require('../../mailtrap/sendEmail');
const URL = process.env.URL;

async function register(req, res, next) {
    const { password, email, subscription } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (user !== null) {
            return res.status(409).send({ message: "User already exist" });
        };

        const passwordHash = await bcrypt.hash(password, 10);
        const verificationToken = uuidv4();

        await User.create({ password: passwordHash, email, subscription, verificationToken });

        await sendEmail({
            to: email,
            subject: "From hw6",
            html: `
            <h1 style='
            color: 	#0000FF;
            text-align: center;
            '>
            HW6
            </h1>
            <a style='
            display: block;
            width: 200px;
            margin: 0 auto;
            padding: 10px 20px;
            background-color: 	#0000FF;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            cursor: pointer;
            'href="${URL}${verificationToken}"
            >
            Click me
            </a>`,
            text: `${URL}${verificationToken}`,
        });

        res.status(201).send({ message: "Registration successful" });
    } catch (error) {
        next(error);
    }
};

module.exports = register;