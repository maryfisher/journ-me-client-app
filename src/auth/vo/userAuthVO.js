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
        isLoggedIn: function() {
            return (!!this.id);
        },
        invalidateUser: function () {
            this.email = undefined;
            this.id = undefined;
            this.role = undefined;
            this.name = undefined;
            this.permissions = undefined;
            this.pic = undefined;
        },
        populateUserDetails: function (responseUser) {
            this.email = responseUser.email;
            this.id = responseUser.userId;
            this.name = responseUser.name;
            this.role = responseUser.role;
            this.permissions = responseUser.permissions;
            this.pic = responseUser.pic;
        }
    });


} (window.angular));