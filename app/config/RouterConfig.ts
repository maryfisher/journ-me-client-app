module jm {
    'use strict';

    import IStateProvider = angular.ui.IStateProvider;
    import IUrlRouterProvider = angular.ui.IUrlRouterProvider;
    import RouteConst = jm.common.RouteConst;

    export interface IRedirectSettings {
        redirectState: string;
    }

    export interface IRedirectAuthenticatedSettings extends IRedirectSettings {
        redirectIfAuthenticated: boolean;
    }

    export interface IRedirectUnauthenticatedSettings extends IRedirectSettings {
        redirectIfUnauthenticated: boolean;
    }

    export interface IRedirectAllSettings extends IRedirectSettings {
        redirectAll: boolean;
    }

    export class RouterConfig {

        static init($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) {
            /*return new RouterConfig($stateProvider, $urlRouterProvider);
        }

        constructor($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) {*/

            var redirectAuth: IRedirectAuthenticatedSettings = {
                redirectIfAuthenticated: true,
                redirectState: RouteConst.DASHBOARD
            }

            var redirectUnauth: IRedirectUnauthenticatedSettings = {
                redirectIfUnauthenticated: true,
                redirectState: RouteConst.HOME
            }

            var redirectAlias: IRedirectAllSettings = {
                redirectAll: true,
                redirectState: RouteConst.ALIAS_DETAIL
            }

            $urlRouterProvider.otherwise(RouteConst.HOME_PATH);
            $stateProvider.state(RouteConst.HOME, {
                url: RouteConst.HOME_PATH,
                templateUrl: 'public/ui/home/home.tpl.html',
                data: redirectAuth
            });
            $stateProvider.state(RouteConst.BROWSE, {
                url: RouteConst.BROWSE_PATH,
                templateUrl: 'public/ui/browse/browse.tpl.html'
            });

            $stateProvider.state(RouteConst.ALIAS_DETAIL, {
                url: RouteConst.ALIAS_DETAIL_PATH,
                templateUrl: 'user/ui/alias/aliasDetail.tpl.html',
                controller: 'AliasDetailController',
                data: redirectAuth
            })

            $stateProvider.state(RouteConst.DASHBOARD, {
                url: RouteConst.DASHBOARD_PATH,
                templateUrl: 'user/ui/dashboard/dashboard.tpl.html',
                controller: 'DashboardController',
                data: redirectAlias
            });

            $stateProvider
                .state(RouteConst.JOURNEY_DETAIL, {
                    url: RouteConst.JOURNEY_DETAIL_PATH,
                    templateUrl: 'journey/ui/detail/journeyDetail.tpl.html',
                    controller: 'JourneyDetailController'
                })
                .state(RouteConst.MOMENT_DETAIL, {
                    abstract: true,
                    parent: RouteConst.JOURNEY_DETAIL,
                    url: RouteConst.MOMENT_DETAIL_PATH,
                    templateUrl: 'moment/ui/detail/momentDetail.tpl.html',
                    controller: 'MomentDetailController'
                })
                .state(RouteConst.MOMENT_BLINKS, {
                    parent: RouteConst.MOMENT_DETAIL,
                    url: RouteConst.MOMENT_BLINKS_PATH,
                    templateUrl: 'moment/ui/blink/momentBlinks.tpl.html',
                    controller: 'MomentBlinksController'
                })
                .state(RouteConst.MOMENT_EMPATHIES, {
                    parent: RouteConst.MOMENT_DETAIL,
                    url: RouteConst.MOMENT_EMPATHIES_PATH,
                    templateUrl: 'moment/ui/empathy/momentEmpathies.tpl.html',
                    controller: 'MomentEmpathiesController'
                });
            $stateProvider.state(RouteConst.MOMENT_EDIT, {
                url: RouteConst.MOMENT_EDIT_PATH,
                templateUrl: 'moment/ui/edit/momentEditForm.tpl.html',
                controller: 'MomentEditFormController',
                data: redirectUnauth
            });
            $stateProvider
                .state(RouteConst.PROFILE, {
                    url: RouteConst.PROFILE_PATH,
                    templateUrl: 'user/ui/profile/profile.tpl.html',
                    controller: 'ProfileController',
                    data: redirectUnauth
                })
                .state(RouteConst.ALIAS_UPDATE, {
                    parent: RouteConst.PROFILE,
                    url: RouteConst.ALIAS_UPDATE_PATH,
                    templateUrl: 'user/ui/profile/editAlias.tpl.html',
                    controller: 'EditAliasController',
                    data: redirectUnauth
                });
        }
    }
}