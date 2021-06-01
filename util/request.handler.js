const sendMail = require('../service/email.sender');
const getMail = require('../service/token.finder');

module.exports = function (request) {

    const key = Object.keys(request).toString();
    const value = Object.values(request).toString();

    if (key === 'email') {
        return sendMail(value);
    } else if (key === 'token') {
        return getMail(value);
    } else {
        console.error('Something went wrong')
    }
}