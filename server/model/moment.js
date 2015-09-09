'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MomentSchema = new Schema({
    id: {
        type: String
    },
    descript: {
        type: String
    },
	created: {
		type: Date,
		default: Date.now
	},
    journey: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Journey'
    }
});

mongoose.model('Moment', MomentSchema);

module.exports = MomentSchema;