///<reference path="..\error\dao\ErrorIntercept.ts"/>
///<reference path="..\auth\dao\AuthTokenIntercept.ts"/>
///<reference path="..\common\const\NGConst.ts"/>
module jm {
    'use strict';

    import NGConst = jm.common.NGConst;
    import ErrorIntercept = jm.error.ErrorIntercept;
    import AuthTokenIntercept = jm.auth.AuthTokenIntercept;

    export class InterceptorConfig {

        private $httpProvider: ng.IHttpProvider

        constructor($injector: ng.auto.IInjectorService) {
            this.$httpProvider = $injector.get < ng.IHttpProvider >(NGConst.$HTTP_PROVIDER);
            this.execute();
        }

        execute() {
            this.$httpProvider.interceptors.push(AuthTokenIntercept.NG_NAME);
            this.$httpProvider.interceptors.push(ErrorIntercept.NG_NAME);
        }
    }
}