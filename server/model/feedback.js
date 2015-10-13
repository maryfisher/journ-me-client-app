'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    alias: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alias'
    },
    moment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Moment'
    },
    states: [{
        type: String
    }],
    /* maybe for later when we want to have recursive empathies
     empathy: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Feedback'
     },*/
    body: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Feedback', FeedbackSchema);

module.exports = FeedbackSchema;