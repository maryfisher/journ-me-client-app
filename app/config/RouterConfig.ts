module jm {
    'use strict';

    import IStateProvider = angular.ui.IStateProvider;
    import IUrlRouterProvider = angular.ui.IUrlRouterProvider;
    import RouteConst = jm.common.RouteConst;

    export class RouterConfig {

        static init($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) {
            /*return new RouterConfig($stateProvider, $urlRouterProvider);
        }

        constructor($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) {*/

            $urlRouterProvider.otherwise(RouteConst.HOME_PATH);
            $stateProvider.state(RouteConst.HOME, {
                url: RouteConst.HOME_PATH,
                templateUrl: 'public/ui/home/home.tpl.html',
                data: {
                    redirectIfAuthenticated: true,
                    redirectState: RouteConst.DASHBOARD
                }
            });
            $stateProvider.state(RouteConst.BROWSE, {
                url: RouteConst.BROWSE_PATH,
                templateUrl: 'public/ui/browse/browse.tpl.html'
            });
            $stateProvider.state(RouteConst.DASHBOARD, {
                url: RouteConst.DASHBOARD_PATH,
                templateUrl: 'user/ui/dashboard/dashboard.tpl.html',
                controller: 'DashboardController',
                data: {
                    redirectIfUnauthenticated: true,
                    redirectState: RouteConst.HOME
                }
            });
            $stateProvider
                .state(RouteConst.JOURNEY_DETAIL, {
                    url: RouteConst.JOURNEY_DETAIL_PATH,
                    templateUrl: 'journey/ui/detail/journeyDetail.tpl.html',
                    controller: 'JourneyDetailController'
                })
                .state(RouteConst.MOMENT_DETAIL, {
                    parent: RouteConst.JOURNEY_DETAIL,
                    url: RouteConst.MOMENT_DETAIL_PATH,
                    templateUrl: 'moment/ui/detail/momentDetail.tpl.html',
                    controller: 'MomentDetailController'
                });
            $stateProvider.state(RouteConst.MOMENT_UPDATE, {
                url: RouteConst.MOMENT_UPDATE_PATH,
                templateUrl: 'moment/ui/edit/momentEditForm.tpl.html',
                controller: 'MomentEditFormController',
                data: {
                    redirectIfUnauthenticated: true,
                    redirectState: RouteConst.HOME
                }
            });
            $stateProvider.state(RouteConst.MOMENT_CREATE, {
                url: RouteConst.MOMENT_CREATE_PATH,
                templateUrl: 'moment/ui/edit/momentEditForm.tpl.html',
                controller: 'MomentEditFormController',
                data: {
                    redirectIfUnauthenticated: true,
                    redirectState: RouteConst.HOME
                }
            });
            $stateProvider
                .state(RouteConst.PROFILE, {
                    url: RouteConst.PROFILE_PATH,
                    templateUrl: 'user/ui/profile/profile.tpl.html',
                    controller: 'ProfileController'
                })
                .state(RouteConst.ALIAS_UPDATE, {
                    parent: RouteConst.PROFILE,
                    url: RouteConst.ALIAS_UPDATE_PATH,
                    templateUrl: 'user/ui/profile/editAlias.tpl.html',
                    controller: 'EditAliasController'
                });
        }
    }
}