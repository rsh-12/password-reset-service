const mongoose = require('mongoose');
const keys = require('../../keys/index');
const connection = require('../../util/db/db.connection')

if (keys.GITHUB) {
    before(() => connection(keys.MONGODB_TEST_URI));
} else {
    before(() => {
        mongoose.connect(keys.MONGODB_TEST_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).catch(err => console.error(err))
    });
}


beforeEach((done) => {
    mongoose.connection.collections.tokens.drop(() => done())
});


after(() => {
    mongoose.connection.close(err => {
        console.error(err);
    });
});