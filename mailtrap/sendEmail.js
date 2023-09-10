require('dotenv').config();

const transport = require('./transport');

const EMAIL = process.env.EMAIL;
// const message = require('./massage');

// const sendEmail = transport
//     .sendMail(message)
//     .then(response => console.log(response))
//     .cath(error => console.error(error));

function sendEmail(message) {
    message['from'] = EMAIL;
    return transport.sendMail(message);
};

module.exports = sendEmail;