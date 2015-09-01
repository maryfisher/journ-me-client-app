// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmUserAuthService', function($http, jmUserAuthVO, jmServerConst, $q) {
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
                    jmServerConst.LOGIN_PATH,
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
                    jmServerConst.REGISTER_PATH,
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
                        jmServerConst.LOGOUT_PATH,
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