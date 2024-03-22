const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    content:{
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        }
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    target_gender:{
        type: String,
        required: true
    },
    target_age_range:{      
        min_age: {
            type: Number,
            required: true
        },
        max_age: {
            type: Number,
            required: true
        }
    },
    target_location:{
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
    // interests: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', adSchema);