// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmUserAuthService', function($http, jmUserAuthVO, $q) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        function invalidateUser() {
            jmUserAuthVO.email = undefined;
            jmUserAuthVO.id = undefined;
            jmUserAuthVO.role = undefined;
            jmUserAuthVO.permissions = undefined;
            jmUserAuthVO.pic = undefined;
        }

        function populateUserDetails(responseUser) {
            jmUserAuthVO.email = responseUser.email;
            jmUserAuthVO.id = responseUser.userId;
            jmUserAuthVO.role = responseUser.role;
            jmUserAuthVO.permissions = responseUser.permissions;
            jmUserAuthVO.pic = responseUser.pic;
        }

        return {
            login: function (email, password) {
                return $http.post(
                    '/api/user/authentication/login',
                    {
                        email: email,
                        password: password
                    },
                    DEFAULT_CONFIG
                ).then(
                    function (response) {
                        populateUserDetails(response.data);
                        return response;
                    },
                    function (response) {
                        invalidateUser();
                        return $q.reject(response);
                    }
                );
            },
            register: function (email, password) {
                return $http.post(
                    '/api/user/authentication/register',
                    {
                        email: email,
                        password: password
                    },
                    DEFAULT_CONFIG
                ).then(
                    function (response) {
                        populateUserDetails(response.data);
                        return response;
                    },
                    function (response) {
                        invalidateUser();
                        return $q.reject(response);
                    }
                );
            },
            logout: function () {
                if (jmUserAuthVO.isLoggedIn()) {
                    return $http.post(
                        'api/user/authentication/logout',
                        {userId: jmUserAuthVO.id},
                        DEFAULT_CONFIG
                    ).finally(
                        function () {
                            invalidateUser();
                        }
                    );
                } else {
                    return $q.reject('Cannot log out if not logged in.');
                }
            }
        };
    });

} (window.angular));