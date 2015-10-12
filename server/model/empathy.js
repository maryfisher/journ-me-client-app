'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmpathySchema = new Schema({
    alias: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alias'
    },
    moment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Moment'
    },
    moods: [{
        type: String
    }],
    /* maybe for later when we want to have recursive empathies
    empathy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empathy'
    },*/
    body: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Empathy', EmpathySchema);

module.exports = EmpathySchema;