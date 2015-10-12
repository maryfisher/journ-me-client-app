/// <reference path="../model/AuthModel.ts" />
module jm.auth {
    'use strict';

    import AuthModel = jm.auth.AuthModel;

    export class AuthTokenIntercept implements ng.IHttpInterceptor {
        static NG_NAME: string = 'authTokenIntercept';

        private authModel: AuthModel;

        constructor($injector: ng.auto.IInjectorService) {
            //TODO FIXME
            //this not working because of circular injection :(
            //this.authModel = $injector.get < AuthModel > (AuthModel.NG_NAME);
        }

        request(config) {
            /*if (this.authModel.isLoggedIn()) {
             config.headers['x-jm-auth-token'] = this.authModel.authToken;
             }*/
            return config;
        }
    }
}