module jm {
    'use strict';

    import AuthModel = jm.auth.AuthModel;
    import AuthDAO = jm.auth.AuthDAO;
    import AuthBarDirect = jm.auth.AuthBarDirect;
    import LoggedInDirect = jm.auth.LoggedInDirect;
    import LoginDirect = jm.auth.LoginDirect;
    import AuthTokenIntercept = jm.auth.AuthTokenIntercept;

    import AliasModel = jm.user.AliasModel;
    import RouterConfig = jm.RouterConfig;
    import RouteUtil = jm.common.RouteUtil;
    import FactoryUtil = jm.common.FactoryUtil;
    import InterceptorConfig = jm.InterceptorConfig;

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
                'ngFileUpload']);
            this.auth = angular.module('auth', []);
            this.journey = angular.module('journey', []);
            this.moment = angular.module('moment', []);
            this.common = angular.module('common', []);
            this.user = angular.module('user', []);

            this.addFactory(RouteUtil);
        }

        initController() {
            this.auth.controller(jm.auth.ctrl);
        }

        initDAOs() {
            this.addFactory(AuthDAO);
        }

        initModels() {
            this.addFactory(AuthModel);
            this.addFactory(AliasModel);
        }

        initDirectives() {
            this.addDirective(AuthBarDirect);
            this.addDirective(LoggedInDirect);
            this.addDirective(LoginDirect);
            this.addDirective(jm.auth.RegisterDirect);
        }

        initInterceptor() {
            this.addFactory(AuthTokenIntercept);
        }

        initConfig() {
            this.jm.config(RouterConfig.init);
            this.jm.config(InterceptorConfig.init);
            this.jm.run(jm.config.TokenLoginCommand.execute);
            this.jm.run(jm.config.StateRedirectCommand.execute);
        }

        addFactory(classType: any) {
            this.jm.factory(classType.NG_NAME, FactoryUtil.getFactory(classType));
        }

        addDirective(className: any) {
            this.jm.directive(className.NG_NAME, FactoryUtil.getDirective(className));
        }
    }
}