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
    image: {
        type: String
    },
    texts: [{
        type: String
    }],
    moods: [{
        type: String
    }]
});

mongoose.model('Blink', BlinkSchema);

module.exports = BlinkSchema;