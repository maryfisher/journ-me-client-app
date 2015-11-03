/// <reference path="../model/AuthModel.ts" />
module jm.auth {
    'use strict';

    import AuthModel = jm.auth.AuthModel;
    import IRequestConfig = ng.IRequestConfig;

    export class AuthTokenIntercept implements ng.IHttpInterceptor {
        static NG_NAME: string = 'authTokenIntercept';

        private authModel: AuthModel;

        constructor($injector: ng.auto.IInjectorService) {

        }

        //NOTE: this has to be injected this way so angular does not whine about circular injection -.-
        init(authModel: AuthModel) {
            this.authModel = authModel;
        }

        request = (config: IRequestConfig): IRequestConfig => {
            if (this.authModel.isLoggedIn()) {
                config.headers['x-jm-auth-token'] = this.authModel.currentUser.authToken;
            }
            return config;
        }
    }
}