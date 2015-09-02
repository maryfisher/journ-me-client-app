// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmUserAuthService', function($http, jmUserAuthVO, jmServerConst, $q) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        return {
            login: function (email, password) {
                return $http.post(
                    jmServerConst.LOGIN_PATH,
                    {
                        email: email,
                        password: password
                    },
                    DEFAULT_CONFIG
                ).then(
                    function (response) {
                        jmUserAuthVO.populateUserDetails(response.data);
                        return response;
                    },
                    function (response) {
                        jmUserAuthVO.invalidateUser();
                        return $q.reject(response);
                    }
                );
            },
            register: function (email, password, name) {
                return $http.post(
                    jmServerConst.REGISTER_PATH,
                    {
                        email: email,
                        password: password,
                        name: name
                    },
                    DEFAULT_CONFIG
                ).then(
                    function (response) {
                        jmUserAuthVO.populateUserDetails(response.data);
                        return response;
                    },
                    function (response) {
                        jmUserAuthVO.invalidateUser();
                        return $q.reject(response);
                    }
                );
            },
            logout: function () {
                if (jmUserAuthVO.isLoggedIn()) {
                    return $http.post(
                        jmServerConst.LOGOUT_PATH,
                        {userId: jmUserAuthVO.id},
                        DEFAULT_CONFIG
                    ).finally(
                        function () {
                            jmUserAuthVO.invalidateUser();
                        }
                    );
                } else {
                    return $q.reject('Cannot log out if not logged in.');
                }
            }
        };
    });

} (window.angular));