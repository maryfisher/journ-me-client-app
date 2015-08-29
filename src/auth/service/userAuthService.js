// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmUserAuthService', function($http, jmUserAuthVO, $location, $q) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }

        var service = {
            login: function(email, password) {
                return $http.post(
                    '/api/user/authentication/login',
                    {email: email, password: password},
                    DEFAULT_CONFIG
                ).then(
                    function(response) {
                        jmUserAuthVO.email = response.data.email;
                        jmUserAuthVO.id = response.data.userId;
                        jmUserAuthVO.role = response.data.role;
                        jmUserAuthVO.permissions = response.data.permissions;
                        jmUserAuthVO.pic = response.data.pic;
                        if(jmUserAuthVO.isLoggedIn()){
                            redirect('/user/' + jmUserAuthVO.id);
                        }

                        return response;
                    },
                    function(response) {
                        jmUserAuthVO.email = '';

                        return $q.reject(response);
                    }
                );
            },
            register: function(email, password) {
                return $http.post(
                    '/api/user/authentication/register',
                    {email: email, password: password},
                    DEFAULT_CONFIG
                ).then(
                    function() {
                        jmUserAuthVO.email = email;

                    },
                    function() {
                        jmUserAuthVO.email = '';
                    }
                );
            },
            logout: function(redirectTo) {
                //$http.post('api/user/authentication/logout').then(function() {
                    jmUserAuthVO.email = '';
                    redirect(redirectTo);
                //});

            }
        };

        return service;
    });

} (window.angular));