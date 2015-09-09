// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmAuth');

    auth.value('jmUserAuthVO', {
        id: undefined,
        email: undefined,
        role: undefined,
        permissions: undefined,
        pic: undefined,
        authToken: undefined,
        isLoggedIn: function() {
            return (!!this.email);
        },
        invalidateUser: function () {
            this.email = undefined;
            this.id = undefined;
            this.role = undefined;
            this.name = undefined;
            this.permissions = undefined;
            this.pic = undefined;
            this.authToken = undefined;
        },
        populateUserDetails: function (responseUser) {
            this.email = responseUser.email;
            this.id = responseUser.id;
            this.name = responseUser.name;
            this.role = responseUser.role;
            this.permissions = responseUser.permissions;
            this.pic = responseUser.pic.data;
            this.authToken = responseUser.authToken;
        }
    });


} (window.angular));