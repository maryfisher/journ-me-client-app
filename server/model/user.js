(function (mongoose) {
    'use strict';

    var userSchema = new mongoose.Schema({
        id: Number,
        name: String,
        email: String,
        //dob: { type: Date, default: Date.now },
        password: String
    });
    mongoose.model('User', userSchema);

}(require('mongoose')));