module.exports = function (value) {
    if (Object.keys(value).toString() === 'email') {
        // some code
    } else if (Object.keys(value).toString() === 'token') {
        // some code
    } else {
        console.error('Something went wrong')
    }
}