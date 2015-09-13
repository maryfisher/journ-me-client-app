// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var auth = angular.module('jmAuth');

    auth.value('jmUserAuthVO', {
        id: undefined,
        email: undefined,
        authToken: undefined,
        currentAlias: undefined,
        isLoggedIn: function () {
            return (!!this.email);
        },
        invalidateUser: function () {
            this.email = undefined;
            this.id = undefined;
            this.authToken = undefined;
            this.currentAlias = undefined;
        },
        populateUserDetails: function (responseUser) {
            this.email = responseUser.email;
            this.id = responseUser.id;
            this.authToken = responseUser.authToken;
            this.currentAlias = responseUser.favAlias._id;
        }
    });


}(window.angular));