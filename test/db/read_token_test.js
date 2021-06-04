const Token = require('../../models/token');
const chai = require('chai')
const expect = chai.expect

let username = 'some@mail.com'
let token;

beforeEach(() => {
    token = new Token({email: username, token: 'sometoken12345'});
    token.save();
})

describe('Reading details of Token', () => {
    it('should find token with email', function (done) {
        Token.findOne({email: username})
            .then((token) => {
                expect(token.email).equal(username);
                done();
            })
    });
})