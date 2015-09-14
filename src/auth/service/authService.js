// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmAuthService', function ($http, jmServerConst, $q) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        return {
            login: function (email, password) {
                return $http.post(
                    jmServerConst.LOGIN_PATH, {
                        email: email,
                        password: password
                    },
                    DEFAULT_CONFIG
                ).then(
                    function (response) {
                        return response.data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                );
            },
            tokenLogin: function (token) {
                return $http.post(
                    jmServerConst.LOGIN_TOKEN_PATH, {
                        authToken: token
                    },
                    DEFAULT_CONFIG
                ).then(
                    function (response) {
                        return response.data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                );
            },
            register: function (email, password, name) {
                return $http.post(
                    jmServerConst.REGISTER_PATH, {
                        email: email,
                        password: password,
                        name: name
                    },
                    DEFAULT_CONFIG
                ).then(
                    function (response) {
                        return response.data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                );
            },
            logout: function (id) {
                return $http.post(
                    jmServerConst.LOGOUT_PATH, {
                        userId: id
                    },
                    DEFAULT_CONFIG
                );
            }
        };
    });

}(window.angular));