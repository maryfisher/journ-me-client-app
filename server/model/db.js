(function (mongoose) {
    'use strict';

    mongoose.connect('mongodb://localhost:27017/journmedb');

}(require('mongoose')));