module jm {
    'use strict';

    import NGConst = jm.common.NGConst;

    export class InterceptorConfig {

        private $httpProvider: ng.IHttpProvider

        constructor($injector: ng.auto.IInjectorService) {
            this.$httpProvider = $injector.get < ng.IHttpProvider >(NGConst.$HTTP_PROVIDER);
            this.execute();
        }

        execute() {
            this.$httpProvider.interceptors.push('authTokenIntercept');
        }
    }
}