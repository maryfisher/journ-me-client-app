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
    },
    moments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Moment' 
    }]
});

mongoose.model('Journey', JourneySchema);

module.exports = JourneySchema;