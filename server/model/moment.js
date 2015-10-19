'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MomentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    journey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'
    },
    alias: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alias'
    },
    isPublic: {
        type: Boolean
    },
    feedback: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }],
    blinks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blink'
    }]
});

mongoose.model('Moment', MomentSchema);

module.exports = MomentSchema;