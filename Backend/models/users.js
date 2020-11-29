const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
});

module.exports = {
    Admin: mongoose.model('Admin', adminSchema)
}