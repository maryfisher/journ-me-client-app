// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmAuth');

    auth.value('jmUserAuthVO', {
        id: 0,
        email: '',
        role: '',
        permissions: [],
        pic: '',
        isLoggedIn: function() {
            return this.email !== '';
        }
    });


} (window.angular));