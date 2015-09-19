module jm {
    'use strict';

    export class InterceptorConfig {

        static init($httpProvider: ng.IHttpProvider) {
            $httpProvider.interceptors.push('authTokenIntercept');
        }
    }
}