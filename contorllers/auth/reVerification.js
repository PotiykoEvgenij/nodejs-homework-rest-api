require('dotenv').config();

const sendEmail = require('../../mailtrap/sendEmail');

const URL = process.env.URL;

const User = require('../../models/user');

async function reVerification(req, res, next) {
    const { email } = req.body;

    try {        
        if (!email) {
            return res.status(400).send({ message: "missing required field email" });
        };

        const user = await User.findOne({ email }).exec();

        if (user.verify) {
            return res.status(400).send({ message: "Verification has already been passed" });
        };
        
        const verificationToken = user.verificationToken;

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

        res.status(200).send({ message: "Verification email sent" });
    } catch (error) {
        next(error)
    }
};

module.exports = reVerification; 