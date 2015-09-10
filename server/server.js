(function (express, bodyParser) {
    'use strict';

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/journmedb');
    
    require('./model/user');
    require('./model/journey');
    require('./model/moment');

    var app = express();
    app.use(bodyParser.json());
    
    require('./config/route/userRoutes.js')(app);
    require('./config/route/journeyRoutes.js')(app);
    require('./config/route/momentRoutes.js')(app);

    module.exports = app;

}(require('express'), require('body-parser')));
