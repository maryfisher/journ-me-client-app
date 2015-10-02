module jm {
    'use strict';

    import FactoryUtil = jm.common.FactoryUtil;

    export class Main {

        private jm: ng.IModule;
        private auth: ng.IModule;
        private journey: ng.IModule;
        private moment: ng.IModule;
        private user: ng.IModule;
        private common: ng.IModule;

        constructor() {
            this.initModules();
            this.initController();
            this.initDAOs();
            this.initModels();
            this.initDirectives();
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
                'ui.bootstrap',
                'ngCookies',
                'ngResource',
                'ui.router',
                'ngAnimate',
                'ngFileUpload']);
            this.auth = angular.module('auth', []);
            this.journey = angular.module('journey', []);
            this.moment = angular.module('moment', []);
            this.common = angular.module('common', []);
            this.user = angular.module('user', []);

            this.addFactory(jm.common.RouteUtil);
        }

        initController() {
            this.auth.controller(jm.auth.ctrl);
            this.user.controller(jm.user.ctrl);
            this.journey.controller(jm.journey.ctrl);
            this.moment.controller(jm.moment.ctrl);
            this.common.controller(jm.common.ctrl);
        }

        initDAOs() {
            this.addFactory(jm.auth.AuthDAO);
            this.addFactory(jm.user.AliasDAO);
            this.addFactory(jm.journey.JourneyDAO);
            this.addFactory(jm.journey.JourneyActionDAO);
            this.addFactory(jm.moment.MomentDAO);
            this.addFactory(jm.moment.EmpathyDAO);
            this.addFactory(jm.moment.BlinkDAO);
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
            this.addDirective(jm.user.AliasListDirect);
            this.addDirective(jm.journey.JourneyListItemDirect);
            this.addDirective(jm.journey.JourneyEditDirect);
            this.addDirective(jm.journey.JourneyTimelineDirect);
            this.addDirective(jm.journey.TimelineMomentDirect);
            this.addDirective(jm.journey.TimelineSelectDirect);
            this.addDirective(jm.journey.LinkJourneyDirect);
            this.addDirective(jm.journey.JourneyRequestsDirect);
            this.addDirective(jm.moment.BlinkFormatDirect);
            this.addDirective(jm.moment.BlinkImgDirect);
            this.addDirective(jm.moment.BlinkTextDirect);
        }

        initInterceptor() {
            this.addFactory(jm.auth.AuthTokenIntercept);
        }

        initConfig() {
            this.jm.config(jm.RouterConfig.init);
            this.jm.config(jm.InterceptorConfig.init);
            this.jm.run(jm.config.TokenLoginCommand.execute);
            this.jm.run(FactoryUtil.getFactory(jm.config.StateRedirectCommand));
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