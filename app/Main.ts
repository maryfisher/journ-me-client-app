module jm {
    'use strict';

    import FactoryUtil = jm.common.FactoryUtil;
    import FilterUtil = jm.common.FilterUtil;

    export class Main {

        private jm: ng.IModule;
        private auth: ng.IModule;
        private journey: ng.IModule;
        private moment: ng.IModule;
        private user: ng.IModule;
        private common: ng.IModule;
        private main: ng.IModule;
        private error: ng.IModule;

        constructor() {
            this.initModules();
            this.initController();
            this.initDAOs();
            this.initModels();
            this.initDirectives();
            this.initFilter();
            this.initInterceptor();
            this.initConfig();
        }

        initModules() {
            this.jm = angular.module('jm', [
                'auth',
                'journey',
                'user',
                'moment',
                'common',
                'main',
                'error',
                'jm-config',
                'ui.bootstrap',
                'ngCookies',
                'ngResource',
                'ui.router',
                'ngAnimate',
                'ngMessages',
                'ngFileUpload',
                'angular-loading-bar'
            ]);
            this.auth = angular.module('auth', []);
            this.journey = angular.module('journey', []);
            this.moment = angular.module('moment', []);
            this.common = angular.module('common', []);
            this.user = angular.module('user', []);
            this.main = angular.module('main', []);
            this.error = angular.module('error', []);

            this.addFactory(jm.common.RouteUtil);
        }

        initController() {
            this.auth.controller(jm.auth.ctrl);
            this.user.controller(jm.user.ctrl);
            this.journey.controller(jm.journey.ctrl);
            this.moment.controller(jm.moment.ctrl);
            this.common.controller(jm.common.ctrl);
            this.main.controller(jm.main.ctrl);
            this.error.controller(jm.error.ctrl);
        }

        initDAOs() {
            this.addFactory(jm.auth.AuthDAO);
            this.addFactory(jm.user.AliasDAO);
            this.addFactory(jm.journey.JourneyDAO);
            this.addFactory(jm.journey.JourneyActionDAO);
            this.addFactory(jm.moment.MomentDAO);
            this.addFactory(jm.moment.FeedbackDAO);
            this.addFactory(jm.moment.BlinkDAO);
            this.addFactory(jm.main.HomeDAO);
        }

        initModels() {
            this.addFactory(jm.auth.AuthModel);
            this.addFactory(jm.user.AliasModel);
            this.addFactory(jm.journey.JourneyModel);
            this.addFactory(jm.moment.MomentModel);
        }

        initDirectives() {
            this.addDirective(jm.auth.AuthBarDirect);
            this.addDirective(jm.auth.LoggedInDirect);
            this.addDirective(jm.auth.LoginDirect);
            this.addDirective(jm.auth.RegisterDirect);
            this.addDirective(jm.user.AliasListItemDirect);
            this.addDirective(jm.user.AliasListImgDirect);
            this.addDirective(jm.user.AliasListDirect);
            this.addDirective(jm.journey.JourneyListItemDirect);
            this.addDirective(jm.journey.JourneyEditDirect);
            this.addDirective(jm.journey.JourneyTimelineDirect);
            this.addDirective(jm.journey.TimelineMomentDirect);
            this.addDirective(jm.journey.TimelineSelectDirect);
            this.addDirective(jm.journey.LinkJourneyDirect);
            this.addDirective(jm.journey.JourneyRequestsDirect);
            this.addDirective(jm.journey.CategoryRatioDirect);
            this.addDirective(jm.journey.CategoryListItemDirect);
            this.addDirective(jm.moment.BlinkFormatDirect);
            this.addDirective(jm.moment.BlinkImgDirect);
            this.addDirective(jm.moment.BlinkTextDirect);
            this.addDirective(jm.moment.BlinkCarouselDirect);
            this.addDirective(jm.moment.BlinkCarouselElementDirect);
            this.addDirective(jm.moment.StateListDirect);
            this.addDirective(jm.moment.StateSelectDirect);
            this.addDirective(jm.moment.MomentListItemDirect);
            this.addDirective(jm.moment.FeedbackListItemDirect);
            this.addDirective(jm.error.LocalErrorDirect);
            this.addDirective(jm.error.GlobalErrorDirect);
            this.addDirective(jm.common.ConvertToNumberDirect);
            this.addDirective(jm.common.EqualToDirect);
        }

        initFilter() {
            this.addFilter(FilterUtil.STATE_SELECT_FILTER);
        }

        initInterceptor() {
            this.addFactory(jm.auth.AuthTokenIntercept);
            this.addFactory(jm.error.ErrorIntercept);
        }

        initConfig() {
            this.jm.config(FactoryUtil.getFactory(jm.RouterConfig));
            this.jm.config(FactoryUtil.getFactory(jm.InterceptorConfig));
            this.jm.run(FactoryUtil.getFactory(jm.config.TokenLoginCommand));
            this.jm.run(FactoryUtil.getFactory(jm.config.StateRedirectCommand));
        }

        addFilter(name: string) {
            this.jm.filter(name, () => FilterUtil[name]);
        }

        addFactory(classType: any) {
            this.jm.factory(classType.NG_NAME, FactoryUtil.getFactory(classType));
        }

        addDirective(className: any) {
            this.jm.directive(className.NG_NAME, FactoryUtil.getDirective(className));
        }
    }

    new Main();
}