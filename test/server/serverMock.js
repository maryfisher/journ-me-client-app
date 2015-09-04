(function serverMockScope(express, bodyParser, fs, mongoose) {
    'use strict';

    mongoose.connect('mongodb://localhost:9000/journmedb');

    var mock = express();
    mock.param(function (name, fn) {
        if (fn instanceof RegExp) {
            return function (req, res, next, val) {
                var captures = fn.exec(String(val));
                if (captures) {
                    req.params[name] = captures;
                    next();
                } else {
                    next('route');
                }
            };
        }
    });

    mock.use(bodyParser.json());
    mock.param('userId', /.*/);
    mock.param('journeyId', /.*/);
    mock.param('momentId', /.*/);

    function returnUser(req, res) {
        try {
            var email = req.body.email;
            var authToken = req.body.authToken;

            if (email === 'die_ulli@hotmail.com' || authToken) {
                fs.readFile('./test/server/pages/' + 1 + '.png', 'base64', function (error, data) {
                    res.status(200).set('Content-Type', 'text/json').send({
                        email: email,
                        name: 'Ulrike',
                        userId: 1,
                        pic: data,
                        authToken: 1,
                        role: 'JOURN_ME_STANDARD_USER2',
                        permissions: ['VIEW_OWNED_ALIASES', 'CREATE_OWN_ALIAS',
                            'VIEW_OWNED_JOURNEYS', 'CREATE_OWN_JOURNEY',
                            'VIEW_OWNED_JOURNEY_MOMENTS', 'CREATE_OWN_JOURNEY_MOMENT']
                    });
                });
            } else {
                res.status(401).end();
            }
        } catch (e) {
            console.error(e);
            res.status(401).body('{errorCode: "E210"}').end();
        }
    }

    // Mock for login - Only one person can currently log in :)
    mock.post('/api/user/authentication/login', returnUser);

    // Mock for login - Only one person can currently log in :)
    mock.post('/api/user/authentication/tokenlogin', returnUser);

    mock.post('/api/user/authentication/logout/', function postPage(req, res) {
        try {
            res.status(200).set('Content-Type', 'text/json').send({

            });
        } catch (e) {
            console.error(e);
            res.status(401).body('Unauthorized').end();
        }
    });

    // Mock for registering
    mock.post('/api/user/authentication/register', function postPage(req, res) {
        try {
            var email = req.body.email;
            var name = req.body.name;

            fs.readFile('./test/server/pages/' + 2 + '.png', 'base64', function (error, data) {
                res.status(200).set('Content-Type', 'text/json').send({
                    email: email,
                    name: name,
                    userId: 2,
                    pic: data,
                    authToken: 2,
                    role: 'JOURN_ME_STANDARD_USER',
                    permissions: ['VIEW_OWNED_ALIASES', 'CREATE_OWN_ALIAS',
                        'VIEW_OWNED_JOURNEYS', 'CREATE_OWN_JOURNEY',
                        'VIEW_OWNED_JOURNEY_MOMENTS', 'CREATE_OWN_JOURNEY_MOMENT']
                });
            });

        } catch (e) {
            console.error(e);
            res.status(401).body('Unauthorized').end();
        }
    });

    mock.get('/api/user/:userId', function(req, res) {
        try {
            res.status(200).send({
                id: req.params.userId[0],
                journeys: [
                    {id: 1, name: 'Journey 1', descript: 'Description of Journey 1'},
                    {id: 2, name: 'Journey 2', descript: 'Description of Journey 2'}
                ]
            });

        } catch (e) {
            console.error(e);
            res.status(404).body('Not Found').end();
        }
    });

    // Mock for getting user details - A binary image is returned for user 1, 2, 3 or 4 - seems to not work with files larger than 170KB!!!
    mock.get('/api/user/:userId/profile-pic', function findCard(req, res) {
        try {
            res.status(200)
                .sendFile('/server/pages/' + req.params.userId + '.png', {
                    root: './test', //this is computer drive file path, not Express server URL path
                    headers: {
                        'Content-Type': 'image/png'
                    }
                });
        } catch (e) {
            console.error(e);
            res.status(404).body('Not Found').end();
        }
    });

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

}(require('express'), require('body-parser'), require('fs'), require('mongoose')));
