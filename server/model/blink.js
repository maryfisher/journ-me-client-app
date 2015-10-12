'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlinkSchema = new Schema({
    moment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Moment'
    },
    format: {
        type: String
    },
    images: [{
        type: String
    }],
    texts: [{
        type: String
    }],
    moods: [{
        type: String
    }],
    ratio: {
        type: Number
    },
    index: {
        type: Number
    }
});

mongoose.model('Blink', BlinkSchema);

module.exports = BlinkSchema;