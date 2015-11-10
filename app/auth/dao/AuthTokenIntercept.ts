///<reference path="..\..\common\const\ServerConst.ts"/>
///<reference path="..\model\AuthModel.ts"/>
module jm.auth {
    'use strict';

    import ServerConst = jm.common.ServerConst;
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
            if (this.authModel.hasAuth()) {
                config.headers[ServerConst.SERVER_TOKEN_KEY] = this.authModel.currentUser.authToken;
            }
            return config;
        }
    }
}