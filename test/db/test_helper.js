const mongoose = require('mongoose');
const keys = require('../../keys/index');
const connection = require('../../util/db/db.connection');

before(() => {
    connection(keys.MONGODB_TEST_URI).catch(reason => {
        console.error(reason);
    });
})

beforeEach((done) => {
    mongoose.connection.collections.tokens.drop(() => done())
});


after(() => {
    mongoose.connection.close(err => {
        console.error(err);
    });
});