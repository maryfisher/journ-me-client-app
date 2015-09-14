// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.value('jmAuthVO', {
        _id: undefined,
        email: undefined,
        authToken: undefined,
        currentAlias: undefined,
        isLoggedIn: false,
        invalidateUser: function () {
            this._id = undefined;
            this.email = undefined;
            this.currentAlias = undefined;
            this.authToken = undefined;
            this.isLoggedIn = false;
        },
        setUser: function (data) {
            this._id = data._id;
            this.email = data.email;
            this.currentAlias = data.favAlias._id;
            this.authToken = data.authToken;
            this.isLoggedIn = true;
        }
    });

}(window.angular));