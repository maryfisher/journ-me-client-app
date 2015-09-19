module jm {
    'use strict';

    import AuthModel = jm.auth.AuthModel;
    import AuthDAO = jm.auth.AuthDAO;
    import AuthBarDirect = jm.auth.AuthBarDirect;
    import LoggedInDirect = jm.auth.LoggedInDirect;
    import AliasModel = jm.user.AliasModel;
    import AuthTokenIntercept = jm.auth.AuthTokenIntercept;
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

            this.jm.factory(RouteUtil.NG_NAME, FactoryUtil.getFactory(RouteUtil));
        }

        initController() {

        }

        initDAOs() {
            this.jm.factory(AuthDAO.NG_NAME, FactoryUtil.getFactory(AuthDAO));
        }

        initModels() {
            this.jm.factory(AuthModel.NG_NAME, FactoryUtil.getFactory(AuthModel));
            this.jm.factory(AliasModel.NG_NAME, FactoryUtil.getFactory(AliasModel));
        }

        initDirectives() {
            this.jm.directive(AuthBarDirect.NG_NAME, FactoryUtil.getDirective(AuthBarDirect));
            this.jm.directive(LoggedInDirect.NG_NAME, FactoryUtil.getDirective(LoggedInDirect));
        }

        initInterceptor() {
            this.jm.factory(AuthTokenIntercept.NG_NAME, FactoryUtil.getFactory(AuthTokenIntercept));
        }

        initConfig() {
            this.jm.config(RouterConfig.init);
            this.jm.config(InterceptorConfig.init);
        }
    }
}