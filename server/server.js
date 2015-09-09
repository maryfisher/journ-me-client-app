(function (express, bodyParser) {
    'use strict';

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/journmedb');
    
    require('./model/user');
    require('./model/journey');

    var app = express();
    app.use(bodyParser.json());
    
    require('./config/route/userRoutes.js')(app);
    require('./config/route/journeyRoutes.js')(app);

    module.exports = app;

}(require('express'), require('body-parser')));
