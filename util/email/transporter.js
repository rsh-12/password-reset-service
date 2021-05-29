const nodemailer = require('nodemailer');
const keys = require('../../keys/index');

module.exports = nodemailer.createTransport({
    host: keys.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: keys.MAIL_USER,
        pass: keys.MAIL_PWD,
    }
});