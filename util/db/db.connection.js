const mongoose = require('mongoose');
const keys = require('../../keys')

module.exports = async function connection() {
    try {
        await mongoose.connect(
            keys.MONGODB_URI, {
                auth: {
                    user: keys.MONGODB_USERNAME,
                    password: keys.MONGODB_PASSWORD
                },
                // authSource: "admin",
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        )
    } catch (e) {
        console.log(e);
    }
};