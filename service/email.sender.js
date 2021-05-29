const keys = require('../keys/index');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const Token = require('../models/token');
const crypto = require('crypto');


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

async function renewToken(username) {
    const query = Token.findOne({email: username});
    const update = {
        email: username,
        token: await bcrypt.hash(crypto.randomBytes(5).toString('hex'), 10),
        expires_at: Date.now() + 10 * 60 * 1000,
        updated_at: Date.now()
    };
    const options = {upsert: true, new: true, setDefaultsOnInsert: true};

    Token.findOneAndUpdate(query, update, options, function (error, result) {
        if (error) return error;
        console.log(result)
    });
}

module.exports = async function (username) {
    await renewToken(username);
}
