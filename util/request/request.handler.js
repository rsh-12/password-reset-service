const sendToken = require('../../service/email.sender');

module.exports = async function (value) {
    const key = Object.keys(value).toString();
    if (key === 'email') {
         await sendToken(Object.values(value));
    } else if (key === 'token') {
        // some code
    } else {
        console.error('Something went wrong')
    }
}