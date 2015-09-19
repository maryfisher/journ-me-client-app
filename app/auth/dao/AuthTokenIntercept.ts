/// <reference path="../model/AuthModel.ts" />
module jm {
    export module auth {
        'use strict';

        import AuthModel = jm.auth.AuthModel;

        export class AuthTokenIntercept implements ng.IHttpInterceptor {
            static NG_NAME: string = 'authTokenIntercept';

            authModel: AuthModel;

            constructor($injector: ng.auto.IInjectorService) {
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
}