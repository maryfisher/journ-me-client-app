'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MomentSchema = new Schema({
    descript: {
        type: String
    },
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
    }
});

mongoose.model('Moment', MomentSchema);

module.exports = MomentSchema;