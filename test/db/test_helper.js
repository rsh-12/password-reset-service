const mongoose = require('mongoose');
const keys = require('../../keys/index');
const connection = require('../../util/db/db.connection')

if (keys.GITHUB) {
    before(() => {
        mongoose.connect(keys.MONGODB_TEST_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).catch(err => console.error(err))
    });
} else {
    before(() => connection(keys.MONGODB_TEST_URI));
}


afterEach((done) => {
    mongoose.connection.collections.tokens.drop(() => done())
});


after(() => {
    mongoose.connection.close(err => {
        console.error(err);
    });
});