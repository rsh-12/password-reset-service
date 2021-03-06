const bcrypt = require('bcryptjs');
const Token = require('../models/token');
const crypto = require('crypto');
const reset = require('../util/email/template');
const transporter = require('../util/email/transporter');

async function renewAndSendToken(username) {
    let success = false;

    const query = Token.findOne({email: username});
    let token = await bcrypt.hash((username + crypto.randomBytes(5).toString('hex')), 10);
    const update = {
        email: username,
        token: token,
        expires_at: Date.now() + 30 * 60 * 1000, // 30 minutes
        updated_at: Date.now()
    };
    const options = {upsert: true, new: true, setDefaultsOnInsert: true};

    await Token.findOneAndUpdate(query, update, options, function (error, result) {
        if (error) {
            console.error(error)
        }
        console.log(result.token)
        transporter.sendMail(reset(username, token))
        success = true;
    });

    return success;
}

module.exports = function (username) {
    return renewAndSendToken(username);
}
