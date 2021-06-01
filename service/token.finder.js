const Token = require('../models/token');

async function findToken(token) {

    let response = '';
    await Token.findOne({token}, function (err, result) {
        if (err) {
            console.error(err);
        }
        if (result != null && result.expires_at > Date.now()) {
            response = result.email;
        }
    });

    return response;
}

module.exports = async function (token) {
    return findToken(token);
};