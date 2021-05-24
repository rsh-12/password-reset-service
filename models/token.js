const {Schema, model} = require('mongoose');

const tokenSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expires_at: {
        type: Date, default: () => Date.now() + 10 * 60 * 1000
    },
    created_at: {
        type: Date, default: Date.now
    },
    updated_at: {
        type: Date, default: Date.now
    }
});

module.exports = model('Token', tokenSchema);