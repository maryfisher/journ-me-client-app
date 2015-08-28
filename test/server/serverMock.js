(function serverMockScope(express, bodyParser, fs) {
    'use strict';

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
    mock.param('userId', /^\d+$/);
    mock.param('journeyId', /.*/);
    mock.param('momentId', /.*/);

    // Mock for login - Only one person can currently log in :)
    mock.post('/api/user/authentication/login', function postPage(req, res) {
        try {
            var email = req.body.email;

            if (email === 'Ulrike') {
                fs.readFile('./test/server/pages/' + 1 + '.png', 'base64', function (error, data) {
                    res.status(200).set('Content-Type', 'text/json').send({
                        email: email,
                        userId: 1,
                        pic: data,
                        role: 'JOURN_ME_STANDARD_USER2',
                        permissions: ['VIEW_OWNED_ALIASES', 'CREATE_OWN_ALIAS',
                            'VIEW_OWNED_JOURNEYS', 'CREATE_OWN_JOURNEY',
                            'VIEW_OWNED_JOURNEY_MOMENTS', 'CREATE_OWN_JOURNEY_MOMENT']
                    });
                });
            } else {
                res.status(401).body('Unauthorized').end();
            }
        } catch (e) {
            console.error(e);
            res.status(401).body('Unauthorized').end();
        }
    });

    // Mock for registering
    mock.post('/api/user/authentication/register', function postPage(req, res) {
        try {
            var email = req.body.email;


            res.status(200).set('Content-Type', 'text/json').send({
                email: email,
                userId: 2,
                role: 'JOURN_ME_STANDARD_USER',
                permissions: ['VIEW_OWNED_ALIASES', 'CREATE_OWN_ALIAS',
                    'VIEW_OWNED_JOURNEYS', 'CREATE_OWN_JOURNEY',
                    'VIEW_OWNED_JOURNEY_MOMENTS', 'CREATE_OWN_JOURNEY_MOMENT']
            });

        } catch (e) {
            console.error(e);
            res.status(401).body('Unauthorized').end();
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

    module.exports = mock;

}(require('express'), require('body-parser'), require('fs')));
