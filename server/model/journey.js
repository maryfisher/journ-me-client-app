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
    join: {
        type: Number
    },
    isPublic: {
        type: Boolean
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
    }],
    joinedAliases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alias'
    }],
    joinRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alias'
    }]
});

mongoose.model('Journey', JourneySchema);

module.exports = JourneySchema;