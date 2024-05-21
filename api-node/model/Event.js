const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    type: {type: String, required: true},
    timestamp: {type: Date, required: true},
    additionalDetails: {type: String, required: false}
});

module.exports = mongoose.model('Event', EventSchema, 'event');