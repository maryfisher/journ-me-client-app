'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StateSchema = new Schema({
    type: {
        type: Number
    },
    name: {
        type: String
    }
});

mongoose.model('State', StateSchema);

module.exports = StateSchema;