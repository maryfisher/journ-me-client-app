(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmApp', [
        'ui.bootstrap',
        'ngCookies',
        'ngResource',
        'ngMessages',
        'ui.router',
        'jmAuth',
        'jmUser',
        'jmJourney',
        'jmMoment',
        'jmCommon'
    ]);

    app.config(function ($stateProvider, $urlRouterProvider, jmRouteConst) {
        $urlRouterProvider.otherwise(jmRouteConst.HOME_PATH);
        $stateProvider.state(jmRouteConst.HOME, {
            url: jmRouteConst.HOME_PATH,
            templateUrl: 'public/ui/home/home.tpl.html',
            redirectIfAuthenticated: true,
            redirectState: jmRouteConst.DASHBOARD
        });
        $stateProvider.state(jmRouteConst.BROWSE, {
            url: jmRouteConst.BROWSE_PATH,
            templateUrl: 'public/ui/browse/browse.tpl.html'
        });
        $stateProvider.state(jmRouteConst.DASHBOARD, {
            url: jmRouteConst.DASHBOARD_PATH,
            templateUrl: 'user/ui/dashboard/dashboard.tpl.html',
            redirectIfUnauthenticated: true,
            redirectState: jmRouteConst.HOME,
            controller: 'jmDashboardController'
        });
        $stateProvider
            .state(jmRouteConst.JOURNEY_DETAIL, {
                url: jmRouteConst.JOURNEY_DETAIL_PATH,
                templateUrl: 'journey/ui/detail/journeyDetail.tpl.html',
                controller: 'jmJourneyDetailController'
            })
            .state(jmRouteConst.MOMENT_DETAIL, {
                parent: jmRouteConst.JOURNEY_DETAIL,
                url: jmRouteConst.MOMENT_DETAIL_PATH,
                templateUrl: 'moment/ui/detail/momentDetail.tpl.html',
                controller: 'jmMomentDetailController'
            });
        $stateProvider.state(jmRouteConst.MOMENT_UPDATE, {
            url: jmRouteConst.MOMENT_UPDATE_PATH,
            templateUrl: 'moment/ui/edit/momentEditForm.tpl.html',
            controller: 'jmMomentEditFormController'
        });
        $stateProvider.state(jmRouteConst.MOMENT_CREATE, {
            url: jmRouteConst.MOMENT_CREATE_PATH,
            templateUrl: 'moment/ui/edit/momentEditForm.tpl.html',
            controller: 'jmMomentEditFormController'
        });
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('jmAuthTokenIntercept');
    });

    app.run(function ($rootScope, $state, jmAuthModel) {
        $rootScope.$on('$stateChangeStart', function (event, next) {

            if (!jmAuthModel.isLoggedIn() && next.redirectIfUnauthenticated) {
                event.preventDefault();
                $state.go(next.redirectState);
            } else if (jmAuthModel.isLoggedIn() && next.redirectIfAuthenticated) {
                event.preventDefault();
                $state.go(next.redirectState);
            }
        });
    });

    app.run(function (jmAuthModel, jmRouteUtil) {
        jmAuthModel.tokenLogin().then(function () {
            if (jmAuthModel.isLoggedIn()) {
                jmRouteUtil.reload();
            }
        });
    });

}(window.angular));