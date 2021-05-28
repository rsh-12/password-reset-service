const keys = require('../keys/index');
const nodemailer = require('nodemailer');


function reset(email, token) {
    return {
        to: keys.MAIL_USER,
        from: keys.MAIL_USER,
        subject: 'Reset password',
        html:
            `
            <h1>Hi ${email}!</h1>
            <p>Some has requested a link to change your password, and you can do this through the link below.</p>
            <a href="${keys.BASE_URL}/some/path?token=${token}">Change my password</a>
            <br>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Your password will not change until you access the link below and create a new one.</p>                    
            `
    }
}

const transporter = nodemailer.createTransport({
    host: keys.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: keys.MAIL_USER,
        pass: keys.MAIL_PWD,
    }
});

module.exports = function () {
    // some code
};