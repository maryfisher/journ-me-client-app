// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.factory('jmAuthModel', function (jmAuthService, jmAliasVO, jmAuthVO, $cookies, $q, jmServerConst) {

        var clearAll = function (response) {
            jmAuthVO.invalidateUser();
            jmAliasVO.invalidateAlias();
            return response;
        };

        var setData = function (data) {
            jmAuthVO.setUser(data);
            jmAliasVO.setAlias(data.favAlias);
            return data;
        };

        var model = {
            login: function (email, password, rememberMe) {
                return jmAuthService.login(email, password).then(
                    function (data) {
                        if (rememberMe) {
                            $cookies.put(jmServerConst.COOKIE_TOKEN_KEY, data.authToken);
                        }
                        return setData(data);
                    }, clearAll);
            },
            tokenLogin: function () {
                var token = $cookies.get(jmServerConst.COOKIE_TOKEN_KEY);
                if (token) {
                    return jmAuthService.tokenLogin(jmAuthVO.authToken).then(
                        setData,
                        function (response) {
                            $cookies.remove(jmServerConst.COOKIE_TOKEN_KEY);
                            return clearAll(response);
                        }
                    );
                } else {
                    return $q.reject();
                }
            },
            register: function (email, password, name) {
                return jmAuthService.register(email, password, name).then(setData, clearAll);
            },
            logout: function () {
                if (model.isLoggedIn()) {
                    $cookies.remove(jmServerConst.COOKIE_TOKEN_KEY);
                    return jmAuthService.logout(jmAuthVO._id).finally(clearAll);
                } else {
                    return $q.reject('Cannot log out if not logged in.');
                }
            },
            currentUser: function () {
                return jmAuthVO;
            },
            isLoggedIn: function () {
                return jmAuthVO.isLoggedIn;
            }
        };

        return model;
    });

    /*app.run(function (jmRouteUtil) {
        model.tokenLogin().then(function () {
            if (model.isLoggedIn()) {
                jmRouteUtil.reload();
            }
        }, function () {

        });
    }); */

}(window.angular));