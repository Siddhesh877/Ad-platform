const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Viewer'
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', adSchema);