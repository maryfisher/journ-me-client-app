// @require user.user
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmUser');

    auth.value('jmUserDashboardVO', {
        journeys: [
            {id: '1', name: 'Journey 1', descript: 'Description of Journey 1'}
        ]
    });


} (window.angular));