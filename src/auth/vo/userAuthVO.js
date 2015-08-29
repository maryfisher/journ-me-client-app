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
        }
    });


} (window.angular));