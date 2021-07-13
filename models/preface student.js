const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
    /*
    firstLesson: {
        type: Date,
        required: true,
        default: Date.now
    }
    */
})

module.exports = mongoose.model('Subscriber', subscriberSchema)