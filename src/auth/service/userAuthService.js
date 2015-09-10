// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmUserAuthService', function ($http, jmUserAuthVO, jmServerConst, $q, $cookies, jmAliasVO) {
        var DEFAULT_CONFIG = {
            timeout: 60000
        };

        var clearAll = function () {
            jmUserAuthVO.invalidateUser();
            jmAliasVO.invalidate();
        };

        var setData = function (data) {
            jmUserAuthVO.populateUserDetails(data);
            jmAliasVO.setAlias(data.favAlias);
        };

        return {
            login: function (email, password, rememberMe) {
                return $http.post(
                    jmServerConst.LOGIN_PATH, {
                        email: email,
                        password: password
                    },
                    DEFAULT_CONFIG
                ).then(
                    function (response) {
                        setData(response.data);
                        if (rememberMe) {
                            $cookies.put(jmServerConst.COOKIE_TOKEN_KEY, jmUserAuthVO.authToken);
                        }
                        return response;
                    },
                    function (response) {
                        clearAll();
                        return $q.reject(response);
                    }
                );
            },
            tokenLogin: function () {
                var token = $cookies.get(jmServerConst.COOKIE_TOKEN_KEY);
                if (token) {
                    return $http.post(
                        jmServerConst.LOGIN_TOKEN_PATH, {
                            authToken: token
                        },
                        DEFAULT_CONFIG
                    ).then(
                        function (response) {
                            setData(response.data);
                            return response;
                        },
                        function (response) {
                            $cookies.remove(jmServerConst.COOKIE_TOKEN_KEY);
                            clearAll();
                            return $q.reject(response);
                        }
                    );
                } else {
                    return $q.reject();
                }
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
                        setData(response.data);
                        return response;
                    },
                    function (response) {
                        clearAll();
                        return $q.reject(response);
                    }
                );
            },
            logout: function () {
                if (jmUserAuthVO.isLoggedIn()) {
                    $cookies.remove(jmServerConst.COOKIE_TOKEN_KEY);
                    return $http.post(
                        jmServerConst.LOGOUT_PATH, {
                            userId: jmUserAuthVO.id
                        },
                        DEFAULT_CONFIG
                    ).finally(
                        function () {
                            clearAll();
                        }
                    );
                } else {
                    return $q.reject('Cannot log out if not logged in.');
                }
            }
        };
    });

}(window.angular));