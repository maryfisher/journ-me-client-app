(function (express, bodyParser, fs) {
    'use strict';

    var mongoose = require('mongoose');
    require('./model/user');
    require('./model/journey');
    
    mongoose.connect('mongodb://localhost:27017/journmedb');

    var mock = express();

    mock.use(bodyParser.json());
    
    require('./config/route/userRoutes.js')(mock);
    //require('./config/route/journeyRoutes.js')(mock);

    mock.get('/api/journey/:journeyId', function(req, res) {
        try {
            res.status(200).send({
                id: req.params.journeyId[0],
                name: 'Journey ' + req.params.journeyId,
                descript: 'Description of Journey ' + req.params.journeyId,
                isUser: true
            });

        } catch (e) {
            console.error(e);
            res.status(404).body('Not Found').end();
        }
    });

    mock.post('/api/journey', function(req, res){
        try {
            res.status(200).set('Content-Type', 'text/json').send(
                {id: 3}
            );

        } catch (e) {
            console.error(e);
            res.status(401).body('Unauthorized').end();
        }
    });

    mock.post('/api/journey/:journeyId', function(req, res) {
        try {
            res.status(200).set('Content-Type', 'text/json').send(
                {id: req.body.id}
            );
        } catch (e) {
            console.error(e);
            res.status(401).body('Unauthorized').end();
        }
    });

    module.exports = mock;

}(require('express'), require('body-parser'), require('fs')));
