'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var JourneySchema = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    descript: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

mongoose.model('Journey', JourneySchema);

module.exports = JourneySchema;