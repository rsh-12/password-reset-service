const mongoose = require('mongoose');
const keys = require('../../keys')

module.exports = async function connection(uri = keys.MONGODB_URI) {
    try {
        await mongoose.connect(
            uri, {
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