const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: [true, 'This email is already in use']
    },
    password: {
        type: String,
        required:true
    },
    address:{
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        }

    },
    website: String,
    contactNumber: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Business', businessSchema);
