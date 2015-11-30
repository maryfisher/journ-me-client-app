module jm {
    'use strict';

    import IStateProvider = angular.ui.IStateProvider;
    import IUrlRouterProvider = angular.ui.IUrlRouterProvider;
    import RouteConst = jm.common.RouteConst;
    import NGConst = jm.common.NGConst;

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

        private $stateProvider: IStateProvider;
        private $urlRouterProvider: IUrlRouterProvider;

        constructor($injector: ng.auto.IInjectorService) {
            this.$stateProvider = $injector.get < IStateProvider >(NGConst.$STATE_PROVIDER);
            this.$urlRouterProvider = $injector.get < IUrlRouterProvider >(NGConst.$URL_ROUTER_PROVIDER);
            this.execute();
        }

        execute() {

            var redirectAuth: IRedirectAuthenticatedSettings = {
                redirectIfAuthenticated: true,
                redirectState: RouteConst.DASHBOARD
            };

            var redirectUnauth: IRedirectUnauthenticatedSettings = {
                redirectIfUnauthenticated: true,
                redirectState: RouteConst.HOME
            };

            var redirectAlias: IRedirectAllSettings = {
                redirectAll: true,
                redirectState: RouteConst.ALIAS_DETAIL
            };

            this.$urlRouterProvider.otherwise(RouteConst.HOME_PATH);
            this.$stateProvider.state(RouteConst.HOME, {
                url: RouteConst.HOME_PATH,
                templateUrl: 'main/ui/home/home.tpl.html',
                controller: jm.main.ctrl.HomeController.NG_NAME/*,
                data: redirectAuth*/
            });
            this.$stateProvider.state(RouteConst.BROWSE, {
                url: RouteConst.BROWSE_PATH,
                templateUrl: 'main/ui/browse/browse.tpl.html',
                controller: jm.main.ctrl.BrowseController.NG_NAME
            });

            this.$stateProvider.state(RouteConst.ALIAS_DETAIL, {
                url: RouteConst.ALIAS_DETAIL_PATH,
                templateUrl: 'user/ui/alias/aliasDetail.tpl.html',
                controller: jm.user.ctrl.AliasDetailController.NG_NAME,
                data: redirectAuth
            });

            this.$stateProvider.state(RouteConst.DASHBOARD, {
                url: RouteConst.DASHBOARD_PATH,
                templateUrl: 'user/ui/dashboard/dashboard.tpl.html',
                controller: jm.user.ctrl.DashboardController.NG_NAME,
                data: redirectAlias
            });

            this.$stateProvider
                .state(RouteConst.JOURNEY_DETAIL, {
                    url: RouteConst.JOURNEY_DETAIL_PATH,
                    templateUrl: 'journey/ui/detail/journeyDetail.tpl.html',
                    controller: jm.journey.ctrl.JourneyDetailController.NG_NAME
                })
                .state(RouteConst.MOMENT_DETAIL, {
                    abstract: true,
                    parent: RouteConst.JOURNEY_DETAIL,
                    url: RouteConst.MOMENT_DETAIL_PATH,
                    templateUrl: 'moment/ui/detail/momentDetail.tpl.html',
                    controller: jm.moment.ctrl.MomentDetailController.NG_NAME
                })
                .state(RouteConst.MOMENT_BLINKS, {
                    parent: RouteConst.MOMENT_DETAIL,
                    url: RouteConst.MOMENT_BLINKS_PATH,
                    templateUrl: 'moment/ui/blink/momentBlinks.tpl.html',
                    controller: jm.moment.ctrl.MomentBlinksController.NG_NAME
                })
                .state(RouteConst.MOMENT_FEEDBACK, {
                    parent: RouteConst.MOMENT_DETAIL,
                    url: RouteConst.MOMENT_FEEDBACK_PATH,
                    templateUrl: 'moment/ui/feedback/momentFeedback.tpl.html',
                    controller: jm.moment.ctrl.MomentFeedbackController.NG_NAME
                });
            this.$stateProvider.state(RouteConst.MOMENT_EDIT, {
                url: RouteConst.MOMENT_EDIT_PATH,
                templateUrl: 'moment/ui/edit/momentEditForm.tpl.html',
                controller: jm.moment.ctrl.MomentEditFormController.NG_NAME,
                data: redirectUnauth
            });
            this.$stateProvider
                .state(RouteConst.PROFILE, {
                    url: RouteConst.PROFILE_PATH,
                    templateUrl: 'user/ui/profile/profile.tpl.html',
                    controller: jm.user.ctrl.ProfileController.NG_NAME,
                    data: redirectUnauth
                })
                .state(RouteConst.ALIAS_UPDATE, {
                    parent: RouteConst.PROFILE,
                    url: RouteConst.ALIAS_UPDATE_PATH,
                    templateUrl: 'user/ui/profile/editAlias.tpl.html',
                    controller: jm.user.ctrl.EditAliasController.NG_NAME,
                    data: redirectUnauth
                });
        }
    }
}