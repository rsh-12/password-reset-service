const sendMail = require('../../service/email.sender');

module.exports = async function (value) {
    const key = Object.keys(value).toString();
    if (key === 'email') {
         await sendMail(Object.values(value).toString());
    } else if (key === 'token') {
        // some code
    } else {
        console.error('Something went wrong')
    }
}