'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AliasSchema = new Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    journeys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'
    }],
    followedJourneys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'
    }],
    created: {
        type: Date,
        default: Date.now
    },
    pic: {
        data: String,
        contentType: String
    }
});

mongoose.model('Alias', AliasSchema);

module.exports = AliasSchema;