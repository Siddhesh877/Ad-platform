const mongoose = require('mongoose');

const viewerSchema = new mongoose.Schema({
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
    age: {
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    location:{
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    intrests: [String],

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Viewer', viewerSchema);