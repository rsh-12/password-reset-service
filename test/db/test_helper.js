const mongoose = require('mongoose');
const keys = require('../../keys/index');

before(() => {
    mongoose.connect(keys.MONGODB_TEST_URI, {
        auth: {
            user: keys.MONGODB_USERNAME,
            password: keys.MONGODB_PASSWORD
        },
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).catch(err => console.error(err))
})

beforeEach((done) => {
    mongoose.connection.collections.tokens.drop(() => done())
});


after(() => {
    mongoose.connection.close(err => {
        console.error(err);
    });
});