'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JourneySchema = new Schema({
    name: {
        type: String
    },
    descript: {
        type: String
    },
    alias: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alias'
    },
    moments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Moment'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alias'
    }],
    linkedToJourneys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'
    }],
    linkedFromJourneys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'
    }]
});

mongoose.model('Journey', JourneySchema);

module.exports = JourneySchema;