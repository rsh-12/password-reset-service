const Token = require('../../models/token');
const assert = require('assert');

describe('Creating documents in MongoDB', () => {
    it('Creates a new Token', (done) => {
        // default: expires_at, created_at, updated_at
        const token = new Token({email: 'some@mail.com', token: 'sometoken12345'});

        token.save() // returns a promise after some time
            .then(() => {
                //if the token is saved in db and it is not new
                assert(!token.isNew);
                done();
            });
    });
});