const Token = require('../../models/token');
const chai = require('chai')
const expect = chai.expect

let username = 'user@mail.com'


describe('Updating a token', () => {

    it('should update token', (done) => {
        const token = new Token({email: username, token: 'token123'});
        token.save().then(() => {
            assert(!token.isNew);
            done();
        })
        const tokenFromDb = Token.findOne({email: username})
        tokenFromDb.then(() => {
            token.token = 'newToken';
            done();
        })

        Token.findOne({email: username})
            .then((token) => {
                expect(token.token).equal('newToken');
                done();
            })
    });

})