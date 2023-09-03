const mongoose = require('mongoose');

const mongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    ownerId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    }
});

const Contact = mongoose.model('Contact', mongooseSchema);

module.exports = Contact; 